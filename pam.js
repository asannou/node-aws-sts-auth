#!/usr/bin/env node
"use strict";

// auth sufficient pam_exec.so expose_authtok /path/to/pam.js

process.exitCode = 1;

const awsStsAuth = require(".");

const USER = "sts-user";
const HOST = "example.com";
const ARN = "arn:aws:sts::123456789012:assumed-role/role-name/";

if (process.env.PAM_USER !== USER) {
  process.exit(1);
}

const slurpStream = (stream, callback) => {
  let buf = "";
  stream.on("data", chunk => buf += chunk);
  stream.on("end", () => callback(buf));
};

slurpStream(process.stdin, token => {
  token = token.replace(/\0$/, "");
  awsStsAuth.validateToken(token, HOST, (err, arn) => {
    if (err) {
      console.error(err);
    } else if (!arn.startsWith(ARN)) {
      console.error(`failure ${arn} is not ${ARN}*`);
    } else {
      console.log("success");
      process.exitCode = 0;
    }
  });
});

process.stdin.resume();

