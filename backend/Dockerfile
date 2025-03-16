# syntax=docker/dockerfile:1
# このDockerfileは開発環境用に設定されています

ARG RUBY_VERSION=3.4.1
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Rails appはここにあります
WORKDIR /rails

# ベースパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client imagemagick && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# 開発環境の設定
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="production"

# ビルドステージ
FROM base AS build

# 必要なビルドパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# アプリケーションのGemをインストール
COPY Gemfile Gemfile.lock ./
RUN bundle install --path /usr/local/bundle && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# アプリケーションコードをコピー
COPY . .

# 開発環境での速度改善用にブートスナップをプリコンパイル
RUN bundle exec bootsnap precompile app/ lib/

# 最終ステージ（アプリケーションの実行環境）
FROM base

# ビルドからの成果物をコピー
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# セキュリティのため、runtime ファイルを非rootユーザーで実行
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

# エントリーポイント設定
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# 開発サーバーを開始
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
