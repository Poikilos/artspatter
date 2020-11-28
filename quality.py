#!/usr/bin/env python

from __future__ import print_function

import os
import subprocess
import shlex
import platform
import sys

# lint_cmd = "npx.cmd jshint"
lint_cmd = "npx.cmd eslint"
err_path = "err.txt"
noReactS = 'in eslint-plugin-react settings, but the'
# ^ "detect" in eslint-plugin-react settings, but the "react" package is
# not installed
once = {noReactS: False}
never = {}


def which(program):
    import os
    def is_exe(fpath):
        return os.path.isfile(fpath) and os.access(fpath, os.X_OK)

    fpath, fname = os.path.split(program)
    if fpath:
        if is_exe(program):
            return program
    else:
        for path in os.environ["PATH"].split(os.pathsep):
            exe_file = os.path.join(path, program)
            if is_exe(exe_file):
                return exe_file

    return None
    # (Jay & Mar77i, 2017)


def is_str(v):
    try:
        vLower = v.lower()
    except AttributeError:
        return False
    return True


def run_command(command, outs, subject=None):
    """
    Sequential arguments:
    command -- the command to run
    outs -- an output stream with encoding="utf-8", otherwise None
    
    Keyword arguments:
    subject -- a file to note in the error (prefix the line)
    """
    count = 0
    cmd_parts = command
    if is_str(command):
        # Make it into a list if it is not.
        cmd_parts = shlex.split(command)
    if not os.path.isfile(cmd_parts[0]):
        cmd_parts[0] = which(cmd_parts[0])
    # print("Running {}".format(cmd_parts))
    process = subprocess.Popen(cmd_parts, stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE)
    # , encoding='utf8')  # (Edejer, 2020)
    CRLFWarning = False
    more = []
    ended = False
    issue = 0
    while True:
        issue += 1
        isError = False
        if len(more) > 0:
            output = more[0]
            isError = True
            more = more[1:]
        elif not ended:
            output = process.stdout.readline()
            if output == '':
                output = process.stderr.readline()
                isError = True
            else:
                err = process.stderr.readline()
                if err != '':
                    more.append(err)
        else:
            break
        # if output == '' and process.poll() is not None:
        # break
        
        if output:
            line = None
            isBad = False
            line = output.strip().decode()
            try:
                pass
            except UnicodeDecodeError:
                line = output.strip().decode(errors='ignore')
                isBad = True
            skip = False
            for one, v in once.items():
                if one in line:
                    if v is False:
                        # print("v is False")
                        once[one] = line
                    else:
                        pass
                        # print("v is {}".format(v))
                    # already will be shown once
                    # (should be, by caller)
                    skip = True
                    continue
                else:
                    pass
                    # print("{} is not in line.".format(one))
            if skip:
                continue
            fatalESLintErr = "Oops! Something went wrong!"
            if fatalESLintErr in line:
                print(line)
                print("^ Your eslint configuration seems to be wrong.")
                count += 1
                raise EnvironmentError("Fatal error")
            # NOTE:
            # Expected linebreaks to be 'LF' is a worse problem (if you
            # are running this on the linux server). To
            # avoid that error on Windows where it is irrelevant, set
            # .eslint.js to use an environment variable to determine
            # linebreak-style.
            # See vitorbal's Augus 24, 2016 answer on
            # <https://stackoverflow.com/questions/39114446/
            # how-can-i-write-a-eslint-rule-for-linebreak-style-
            # changing-depending-on-windo>
            
            if "Expected linebreaks to be 'CRLF'" in line:
                if platform.system() == "Windows":
                    start = line.find("Expected linebreaks")
                    if start < 0:
                        start = 0
                    line = line[start:]  # Remove row:column notation.
                    if never.get(line) is None:
                        never[line] = 1
                    else:
                        never[line] += 1
                    # Ignore this due to autocrlf enabled in git config
                    # by default in git for Windows and GitHub Desktop:
                    # <https://github.com/desktop/desktop/issues/3828>
                    continue

            if outs is not None:
                if isBad:
                    line = line.encode('cp1252',
                                       errors='ignore').decode()
                    # ^ See <https://stackoverflow.com/questions/
                    # 62656579/why-im-getting-unicodeencodeerror-
                    # charmap-codec-cant-encode-character-u2>
                    pass
                outs.write(line + "\n")
            print(line)
            count += 1
        if (not ended) and (process.poll() is not None):
            ended = True
            if len(more) < 1:
                break
    if count < 1:
        sys.stderr.write(".")
        sys.stderr.flush()
    rc = process.poll()
    return rc
    # (Ponnusamy, 2015)

# def is_exception(o):
# return hasattr(o, '__reduce_ex__')

def check_quality(path, outs):
    if not os.path.isfile(path):
        raise ValueError("{} is not a file.".format(path))
    name = os.path.split(path)[-1]
    nameL = name.lower()
    
    if nameL.endswith(".js") or nameL.endswith(".jsx"):
        # print()
        # print("# * checking {}".format(path))
        ret = run_command(shlex.split(lint_cmd) + [path], outs)
    return True


def check_quality_in(path, outs):
    for sub in os.listdir(path):
        if sub.startswith("."):
            continue
        if sub == "node_modules":
            continue
        subPath = os.path.join(path, sub)
        if os.path.isdir(subPath):
            ret = check_quality_in(subPath, outs)
        else:
            ret = check_quality(subPath, outs)


def main():
    # if os.path.isfile(err_path):
    # os.remove(err_path)
    with open(err_path, 'w', encoding="utf8") as outs:
        try:
            ret = check_quality_in(os.path.realpath("."), outs)
            errors = []
            for one, v in once.items():
                if v is not False:
                    errors.append(v)
            if len(errors) > 0:
                print("[quality.py main]"
                      " check_quality_in reduced repetive errors:")
                for v in errors:
                    print(v)
            neverLen = len(never.keys())
            if neverLen > 0:
                print("[quality.py main] ignoring the following:")
                for line, count in never.items():
                    if count > 0:
                        print("{} instances of: {}".format(count, line))
        except EnvironmentError:
            exit(1)


if __name__ == "__main__":
    main()


#                           References
# Edejer, F. (2020, November 18). Comments for Getting realtime output
#     using Python Subprocess - Issue #1078 -
#     EndPointCorp/end-point-blog [Comment]. GitHub.
#     https://github.com/EndPointCorp/end-point-blog/issues/1078
# Jay, & Mar77i. (2017, November 10). Path—Test if executable exists in
#     Python? [Answer]. Stack Overflow.
#     https://stackoverflow.com/questions/377017/
#     test-if-executable-exists-in-python
# Ponnusamy, K. (2015, January 28). *Getting realtime output using
#     Python subprocess*. End Point.
#     https://www.endpoint.com/blog/2015/01/28/
#     getting-realtime-output-using-python
