#!/usr/bin/env python

from __future__ import print_function

import os
import subprocess
import shlex

lint_cmd = "npx.cmd jshint"
err_path = "err.txt"


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
    while True:
        output = process.stdout.readline()
        # if output == '' and process.poll() is not None:
        # break
        if output:
            line = output.strip().decode()
            if outs is not None:
                outs.write(line + "\n")
            print(line)
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
        run_command(shlex.split(lint_cmd) + [path])


def check_quality_in(path):
    for sub in os.listdir(path):
        if sub.startswith("."):
            continue
        if sub == "node_modules":
            continue
        subPath = os.path.join(path, sub)
        if os.path.isdir(subPath):
            check_quality_in(subPath)
        else:
            check_quality(subPath)


def main():
    if os.path.isfile(err_path):
        os.remove(err_path)
    with open(err_path, 'a') as outs:
        check_quality_in(os.path.realpath("."), outs)

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
