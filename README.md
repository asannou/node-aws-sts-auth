## Generate token

```
$ docker run -it --rm asannou/aws-sts-auth generate example.com 60
https://sts.amazonaws.com/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAIOSFODNN7EXAMPLE%2F20170513%2Fus-east-1%2Fsts%2Faws4_request&X-Amz-Date=20170513T080053Z&X-Amz-Expires=60&X-Amz-Security-Token=FQoDYXdzELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDK%2Fi3S2kKk5HhLvpxyLBA7sEzuy8AutCaEe4LdeFzpZvB3HaYXWKB5Gvz0q1wX4Pvsv44w12HfAnB%2FD1blRFI2lf5ajd43RtsN6jHll7yChKGq1C%2BXT5idGsvqovPQ87XhWl%2FypRz9DinbMis8mdlxPhVAbrO2VDuR%2B01fWimTMUXh1jXTUzbGniDHccXCUBN9qpABkcBaLkrZGEX4zszt2JqCKiCD9Qm1zIu3%2ByM7jHt69alfV4XDdkq%2BmwKncckf19%2B4jQUzpeWOWaJhvCArhj3irAn4ufZa7aJkKksZ7MZ78TYUI9HD4KRfA4R45LOFUgdy02%2FM7tTQakVYei8ZBjsoTCfVkVYmxiMTlS8CJBp%2FzO9LvnLamBDEpZrtx4%2B15XfKrxsURAxBEa8c%2B50X%2FsSAqZmhEFbyeEA3kgFpWYzeW9sUz3psHPm0vPEFVeeyIGVn63oJ7HiXrBVtaQaaiHwK3POMiiazD9Gr3EctQ0thVzTbGlZc9vCh9vsruMEsPKZzcDbgA%2Fci889dcwSCwK28I%2BIVjtKWr2hRrRw0J0D6u5EMdbWBpjM2fZTgkaHoZDOMT2Jn9Sbqu3qwXGp93InrUfzT8x%2BDizoZBFuNEsKLn22sgF&X-Amz-Signature=dd467ac5f169c7ec5bf22bb22bbc22a7a7df95631048d4508c938c9ac32617ec&X-Amz-SignedHeaders=host%3Bx-host
```

```
$ docker run -it --rm -v ~/.aws:/root/.aws asannou/aws-sts-auth generate example.com 60
https://sts.amazonaws.com/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20170513%2Fus-east-1%2Fsts%2Faws4_request&X-Amz-Date=20170513T081334Z&X-Amz-Expires=60&X-Amz-Signature=e263c43ca1a968145738c5eac4618955a7ac600cc8e762be0ff3b0dbd228fc5d&X-Amz-SignedHeaders=host%3Bx-host
```

## Validate token

```
$ docker run -it --rm asannou/aws-sts-auth validate 'https://sts.amazonaws.com/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAIOSFODNN7EXAMPLE%2F20170513%2Fus-east-1%2Fsts%2Faws4_request&X-Amz-Date=20170513T080053Z&X-Amz-Expires=60&X-Amz-Security-Token=FQoDYXdzELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDK%2Fi3S2kKk5HhLvpxyLBA7sEzuy8AutCaEe4LdeFzpZvB3HaYXWKB5Gvz0q1wX4Pvsv44w12HfAnB%2FD1blRFI2lf5ajd43RtsN6jHll7yChKGq1C%2BXT5idGsvqovPQ87XhWl%2FypRz9DinbMis8mdlxPhVAbrO2VDuR%2B01fWimTMUXh1jXTUzbGniDHccXCUBN9qpABkcBaLkrZGEX4zszt2JqCKiCD9Qm1zIu3%2ByM7jHt69alfV4XDdkq%2BmwKncckf19%2B4jQUzpeWOWaJhvCArhj3irAn4ufZa7aJkKksZ7MZ78TYUI9HD4KRfA4R45LOFUgdy02%2FM7tTQakVYei8ZBjsoTCfVkVYmxiMTlS8CJBp%2FzO9LvnLamBDEpZrtx4%2B15XfKrxsURAxBEa8c%2B50X%2FsSAqZmhEFbyeEA3kgFpWYzeW9sUz3psHPm0vPEFVeeyIGVn63oJ7HiXrBVtaQaaiHwK3POMiiazD9Gr3EctQ0thVzTbGlZc9vCh9vsruMEsPKZzcDbgA%2Fci889dcwSCwK28I%2BIVjtKWr2hRrRw0J0D6u5EMdbWBpjM2fZTgkaHoZDOMT2Jn9Sbqu3qwXGp93InrUfzT8x%2BDizoZBFuNEsKLn22sgF&X-Amz-Signature=dd467ac5f169c7ec5bf22bb22bbc22a7a7df95631048d4508c938c9ac32617ec&X-Amz-SignedHeaders=host%3Bx-host' example.com
arn:aws:sts::123456789012:assumed-role/role-name/role-session-name
```

```
$ docker run -it --rm asannou/aws-sts-auth validate 'https://sts.amazonaws.com/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20170513%2Fus-east-1%2Fsts%2Faws4_request&X-Amz-Date=20170513T081334Z&X-Amz-Expires=60&X-Amz-Signature=e263c43ca1a968145738c5eac4618955a7ac600cc8e762be0ff3b0dbd228fc5d&X-Amz-SignedHeaders=host%3Bx-host' example.com
arn:aws:iam::123456789012:user/user-name
```

```
$ curl -H 'X-Host: example.com' 'https://sts.amazonaws.com/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAIOSFODNN7EXAMPLE%2F20170513%2Fus-east-1%2Fsts%2Faws4_request&X-Amz-Date=20170513T080053Z&X-Amz-Expires=60&X-Amz-Security-Token=FQoDYXdzELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDK%2Fi3S2kKk5HhLvpxyLBA7sEzuy8AutCaEe4LdeFzpZvB3HaYXWKB5Gvz0q1wX4Pvsv44w12HfAnB%2FD1blRFI2lf5ajd43RtsN6jHll7yChKGq1C%2BXT5idGsvqovPQ87XhWl%2FypRz9DinbMis8mdlxPhVAbrO2VDuR%2B01fWimTMUXh1jXTUzbGniDHccXCUBN9qpABkcBaLkrZGEX4zszt2JqCKiCD9Qm1zIu3%2ByM7jHt69alfV4XDdkq%2BmwKncckf19%2B4jQUzpeWOWaJhvCArhj3irAn4ufZa7aJkKksZ7MZ78TYUI9HD4KRfA4R45LOFUgdy02%2FM7tTQakVYei8ZBjsoTCfVkVYmxiMTlS8CJBp%2FzO9LvnLamBDEpZrtx4%2B15XfKrxsURAxBEa8c%2B50X%2FsSAqZmhEFbyeEA3kgFpWYzeW9sUz3psHPm0vPEFVeeyIGVn63oJ7HiXrBVtaQaaiHwK3POMiiazD9Gr3EctQ0thVzTbGlZc9vCh9vsruMEsPKZzcDbgA%2Fci889dcwSCwK28I%2BIVjtKWr2hRrRw0J0D6u5EMdbWBpjM2fZTgkaHoZDOMT2Jn9Sbqu3qwXGp93InrUfzT8x%2BDizoZBFuNEsKLn22sgF&X-Amz-Signature=dd467ac5f169c7ec5bf22bb22bbc22a7a7df95631048d4508c938c9ac32617ec&X-Amz-SignedHeaders=host%3Bx-host'
<GetCallerIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <GetCallerIdentityResult>
    <Arn>arn:aws:sts::123456789012:assumed-role/role-name/role-session-name</Arn>
    <UserId>AROAIOSFODNN7EXAMPLE:role-session-name</UserId>
    <Account>123456789012</Account>
  </GetCallerIdentityResult>
  <ResponseMetadata>
    <RequestId>5c680368-37b8-11e7-840e-4144c2df98ef</RequestId>
  </ResponseMetadata>
</GetCallerIdentityResponse>
```
