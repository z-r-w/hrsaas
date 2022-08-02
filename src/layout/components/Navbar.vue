<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="app-breadcrumb">
      盛丰物流集团有限公司
      <span class="breadBtn">体验版</span>
    </div>
    <!--     <breadcrumb class="breadcrumb-container" />
 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img src="@/assets/common/bigUserHeader.png" class="user-avatar"> -->
          <img v-imageError="defaultImg" :src="staffPhoto" alt="" class="user-avatar">
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    /* Breadcrumb,*/
    Hamburger
  },
  data() {
    return {
      defaultImg: require('@/./assets/common/bigUserHeader.png')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'staffPhoto'

    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    color: #fff;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .app-breadcrumb {
    float: left;
    line-height: 50px;
    cursor: text;
    font-size: 18px;
    color: #ffffff;
    .breadBtn {
      height: 30px;
      // display: inline-block;
      padding: 3px 10px;
      background: #84a9fe;
      font-size: 14px;
      border-radius: 10px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    // vertical-align: middle;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      // height: 50px;
      // line-height: 50px;
      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        // line-height: 50px;
        // height: 50px;
        // display: flex;
        // align-items: center;
        // text-align:center;
        // vertical-align: middle;
        .user-avatar {

          vertical-align: middle;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
        .user-name {
          // vertical-align: middle;
          color: #fff;
          margin-left: 5px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
