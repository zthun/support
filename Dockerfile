FROM node:17 as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build

FROM build as release
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git remote set-url origin https://github.com/zthun/support
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes --no-push -m "chore: version [skip ci]" && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "chore: update yarn lockfile [skip ci]" && \
    git push && \
    git push --tags
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:17-alpine as support.web.install
RUN npm install -g @zthun/support.web

FROM nginx:1.21.5-alpine as support.web
COPY --from=support.web.install /usr/local/lib/node_modules/@zthun/support.web/dist/. /usr/share/nginx/html/

FROM node:17-alpine as support.api
RUN npm install -g @zthun/support.api
EXPOSE 3000
CMD ["zthun-support-api"]
