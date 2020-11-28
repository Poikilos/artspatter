#!/usr/bin/env python

from __future__ import print_function

import os
import subprocess
import shlex
import platform

# lint_cmd = "npx.cmd jshint"
lint_cmd = "npx.cmd eslint"
err_path = "err.txt"
noReactS = ('"detect" in eslint-plugin-react settings, but the "react" package is not installed')
once = {noReactS: False}


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


def run_command(command, outs):
    cmd_parts = command
    if is_str(command):
        # Make it into a list if it is not.
        cmd_parts = shlex.split(command)
    if not os.path.isfile(cmd_parts[0]):
        cmd_parts[0] = which(cmd_parts[0])
    # print("Running {}".format(cmd_parts))
    process = subprocess.Popen(cmd_parts, stdout=subprocess.PIPE)
    # , encoding='utf8')  # (Edejer, 2020)
    CRLFWarning = False
    while True:
        output = process.stdout.readline()
        # if output == '' and process.poll() is not None:
        # break
        
        if output:
            line = None
            isBad = False
            try:
                line = output.strip().decode()
            except UnicodeDecodeError:
                line = output.strip().decode(errors='ignore')
                isBad = True

            for one, v in once.items():
                if one in line:
                    if v is False:
                        print("v is False")
                        once[one] = line
                    else:
                        print("v is {}".format(v))
                    # already will be shown once
                    # (should be, by caller)
                    continue
                elif "not installed" in line:
                    print("WARNING: didn't detect '{}' as '{}'"
                          "".format("line", one))
            if "Expected linebreaks to be 'LF'" in line:
                if platform.system() == "Windows":
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
            print("[quality.py] " + line)
        if process.poll() is not None:
            break

    rc = process.poll()
    return rc
    # (Ponnusamy, 2015)


def check_quality(path, outs):
    if not os.path.isfile(path):
        raise ValueError("{} is not a file.".format(path))
    name = os.path.split(path)[-1]
    nameL = name.lower()
    
    if nameL.endswith(".js"):
        print()
        print("# * checking {}".format(path))
        run_command(shlex.split(lint_cmd) + [path], outs)


def check_quality_in(path, outs):
    for sub in os.listdir(path):
        if sub.startswith("."):
            continue
        if sub == "node_modules":
            continue
        subPath = os.path.join(path, sub)
        if os.path.isdir(subPath):
            check_quality_in(subPath, outs)
        else:
            check_quality(subPath, outs)


def main():
    # if os.path.isfile(err_path):
    # os.remove(err_path)
    with open(err_path, 'w', encoding="utf8") as outs:
        check_quality_in(os.path.realpath("."), outs)
        print("[quality.py main]"
              " check_quality_in reduced repetive errors:")
        for one, v in once.items():
            if v is not False:
                print(v)


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
