<template>
  <header>
    <div class="sui-navbar">
      <div class="navbar-inner">
        <a href="./headline-login.html" class="sui-brand">
          <img src="/images/asset-logo-black.png" alt="社交" />
        </a>
        <ul class="sui-nav">
          <li class="active"><a href="./headline-logined.html">头条</a></li>
          <li><a href="./qa-login.html">问答</a></li>
          <li><a href="./activity-index.html">活动</a></li>
          <li><a href="./makeFriends-index.html">交友</a></li>
          <li><a href="./spit-index.html">吐槽</a></li>
          <li><a href="./recruit-index.html">招聘</a></li>
        </ul>
        <form class="sui-form sui-form pull-left">
          <input type="text" placeholder="输入关键词..." />
          <span class="btn-search fa fa-search"></span>
        </form>
        <div class="sui-nav pull-right info">
          <li><a @click="$store.commit('setNeedLoginState', true)">注册</a></li>
          <li><a @click="$store.commit('setNeedLoginState', true)" class="sui-btn btn-login">登录</a></li>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="css">
</style>
