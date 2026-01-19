FROM denoland/deno:latest
COPY . .

RUN apt upgrade && deno install
EXPOSE 3000

CMD ["deno", "run", "--allow-env", "--allow-net", "main.ts"]