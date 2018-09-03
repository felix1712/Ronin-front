import axios from 'axios';

export const service = axios.create({
  baseURL: 'https://prototype-review-api.sleekr.id/v1/kpi',
  headers: {
    Authorization: 'BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjo3MDMzNSwidXNlcm5hbWUiOm51bGwsInBob25lX251bWJlciI6IjAyMTEwMDAwMDAiLCJuYW1lIjoiUmlja3kgU3VyeWEgUHV0cmEiLCJlbWFpbCI6InJpY2t5QGR1bW15LmNvbSIsImF2YXRhciI6IiIsImVtcGxveWVlIjp7ImlkIjo2MTY2MiwiY29tcGFueV9pZCI6NDUwMCwiam9iX3RpdGxlX2lkIjo0MjE0NywibG9jYXRpb25faWQiOm51bGwsInVzZXJfaWQiOjcwMzM1LCJpbnZpdGVkX2J5IjpudWxsLCJidWRkeSI6bnVsbCwib3duZXIiOjAsIndvcmtfZW1haWwiOm51bGwsImV4aXN0aW5nIjoxLCJiYXNpY19zYWxhcnkiOiJleUpwZGlJNkltbEtkMmwzUW5ac1JrOXZjamRoVmtJclFsWndjbEU5UFNJc0luWmhiSFZsSWpvaVRIWXdibUl4VW0xbldrdGhSazlhYm5OV2NVVnpVVDA5SWl3aWJXRmpJam9pTm1aaE5HSXhaRGRrTUdJd1pETTBOMkU1Wm1SaE1qTmlNVGhrWVRsaE1tVXdaR0ZoTkRBMFlqWTFOR1JoTXpkallqQmpPR0kzT0Roak5qRTJOemN5TlNKOSIsInNhbGFyeV90eXBlIjpudWxsLCJlbXBsb3ltZW50X3R5cGUiOiJwZXJtYW5lbnQiLCJlbXBsb3ltZW50X3N0YXR1cyI6MSwidGhyIjpudWxsLCJqb2luX2RhdGUiOiIyMDAwLTAxLTAxIiwidGVybWluYXRlZF9kYXRlIjpudWxsLCJuaWsiOiJTMDAwMDIiLCJlbmRfdG91ciI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMTgtMDgtMDEgMTE6MjQ6MjEiLCJwdGtwX3N0YXR1cyI6bnVsbCwiYmFkZ2VubyI6bnVsbCwicGF5cm9sbF9jb3JyZWN0aW9uIjpudWxsLCJlbmRfY29udHJhY3RfZGF0ZSI6bnVsbCwiZGVwYXJ0bWVudF9pZCI6MTQyODAsIl9sZnQiOjgzNTI0LCJfcmd0Ijo4MzUyNSwicGFyZW50X2lkIjo2MTY2MCwidXBkYXRlZF9hdCI6IjIwMTgtMDgtMjAgMTA6NTI6NDUiLCJvcmdhbmlzYXRpb25fbm9kZV9pZCI6MTA4ODQsInRvdXJzIjpudWxsLCJqb2JfbGV2ZWxfaWQiOm51bGwsInFpc2N1c19yZWdpc3RlcmVkIjowLCJhdXRoZW50aWNhdGlvbl90b2tlbiI6IktMbmRrTFJXQ1RZaml1MnBGc0hjS0xHQiIsInJlcG9ydF9kb3dubG9hZF9hdHRlbXB0X21hcmtfYXQiOm51bGwsImRlbGV0ZWRfYXQiOm51bGx9fSwiaW1nX3BhdGgiOiJodHRwczovL3MzLWFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb20vdGFsZW50YS9hdmF0YXIvIiwic3ViIjo3MDMzNSwiaXNzIjoiaHR0cHM6Ly9wcm90b3R5cGUtcmV2aWV3LWFwaS5zbGVla3IuaWQvdjEva3BpL29hdXRoL2FjY2Vzc190b2tlbiIsImlhdCI6MTUzNTk2ODMzNCwiZXhwIjoxNTM2MDU0NzM0LCJuYmYiOjE1MzU5NjgzMzQsImp0aSI6Ijl3cmxOYk5kTmlHNmFJdTgifQ.xW--eW-vrjPqMONrkmLKXIqw8WrSddlDtVQgSBswJJ8'
  },
  
});