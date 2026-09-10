import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
const root = process.cwd();
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript" };
http.createServer(async (req,res)=>{
  try { const path = join(root, req.url === "/" ? "index.html" : req.url.split("?")[0]); const data=await readFile(path); res.writeHead(200,{"content-type":types[extname(path)]||"application/octet-stream"}); res.end(data); }
  catch { res.writeHead(404); res.end("Not found"); }
}).listen(4173, "127.0.0.1", ()=>console.log("Local: http://127.0.0.1:4173"));
