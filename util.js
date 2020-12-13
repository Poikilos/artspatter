exports.getDotExt = (getExtPath)  => {
  var ext = /^.+\.([^.]+)$/.exec(getExtPath);
  // ^ https://stackoverflow.com/a/190878/4541104
  //   answer for "How can I get file extensions with JavaScript?"
  // ^ CC BY-SA 3.0 [Tom](https://stackoverflow.com/users/23746)
  return (ext != null ? ("." + ext[1]) : "");
}

exports.removeExt = (removeExtPath)  => {
  dotExt = exports.getDotExt(removeExtPath);
  return removeExtPath.substring(0, removeExtPath.length - dotExt.length);
}

exports.removeStart = (str, needle)  => {
  if (str.startsWith(needle)) {
    str = str.substring(needle.length);
  }
  return str;
}