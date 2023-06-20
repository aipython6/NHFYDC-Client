<template>
  <div>
    <Card>
      <Card.Meta title="关于">
        <template #description>
          <BlankLink :url="pkg.author.url" :text="pkg.name" />
          的前端项目是基于Vue3.x+Vue-CLI5.x+ Ant-Design-Vue3.x+TypeScript4.x开发.
          <div
            >提供了用户管理、菜单管理、角色管理、指标管理和数据查询的基本功能,后续可根据需要添加更多新功能。</div
          >
          <div>如果您有其他更好的建议,请联系我(15507340602)</div>
        </template>
      </Card.Meta>
    </Card>
  </div>
</template>

<script setup lang="tsx">
  import { Card } from 'ant-design-vue';
  const { pkg } = __APP_INFO__;

  const BlankLink = ({ url = '', text }) => {
    const target = /^http(s)?:/.test(url) ? url : `https://www.npmjs.com/package/${url}`;
    return (
      <a href={target} target="_blank">
        {text}
      </a>
    );
  };
</script>
