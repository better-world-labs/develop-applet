<!--
 * @Author: 刘一笔
 * @Date: 2023-05-09 01:06:27
 * @Description: 
-->
<template>
  <div class="small-program-blank">
    <img src="@/assets/no-data.png" alt="" />
    <div class="text-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.small-program-blank {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);

  /* 垂直居中 */
  img {
    width: 112px;
    height: 112px;
  }

  .text-wrap {
    margin-top: 10px;
    color: #ABACAE;
  }
  :slotted(.link) {
      color: #5652FF;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
  }

}</style>