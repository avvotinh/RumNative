<template lang="html">
  <Page ref="body" @loaded="loaded" androidStatusBarBackground="#00C9FF">
    <ActionBar backgroundColor="#00C9FF">
      <GridLayout columns="auto, *, auto">
        <Label
          col="1"
          text="Rum Dev"
          fontSize="24"
          color="white"
          verticalAlignment="center"
          horizontalAlignment="left"
        />
        <StackLayout col="2" orientation="horizontal">
          <MDButton
            class="fa btn-icon"
            marginRight="0"
            marginLeft="0"
            rippleColor="rgba(0,0,0,0.08)"
            :text="'fa-calendar' | fonticon"
            elevation="0"
            variant="flat"
            @tap="openModal"
          />
          <MDButton
            class="fa btn-icon"
            marginRight="0"
            marginLeft="0"
            rippleColor="rgba(0,0,0,0.08)"
            :text="'fa-bell' | fonticon"
            elevation="0"
            variant="flat"
            @tap="openDrawer"
          />
          <MDButton
            class="fa btn-icon"
            marginRight="0"
            marginLeft="0"
            rippleColor="rgba(0,0,0,0.08)"
            :text="'fa-user' | fonticon"
            elevation="0"
            variant="flat"
            id="menu-user"
            ref="menu"
            @tap="openMenuUser"
          />
        </StackLayout>
      </GridLayout>
    </ActionBar>
    <StackLayout ~mainContent orientation="vertical">
      <StackLayout v-show="!connection" ref="connections" height="30" backgroundColor="red" orizontalAlignment="center" verticalAlignment="middle"> 
        <Label 
          color="white" 
          text="Network Disconnect!" 
          horizontalAlignment="center" 
          verticalAlignment="middle"/>
      </StackLayout>
      <GridLayout backgroundColor="rgba(0,0,0,0.04)" columns="*, *" rows="*">
        <CardView 
          col="0" 
          class="box-container"
          elevation="4" radius="8"
          marginRight="5"
          marginBottom="15"
          marginLeft="15"
          marginTop="15">
          <StackLayout 
            orientation="vertical" padding="8">
              <GridLayout columns="*" rows="50" class="box-title">
                <Label text="Pending" col="0" class="title"/>
              </GridLayout>
              <RadListView ref="listView1" for="item in pendingItems">
                <v-template>
                  <Panel marginBottom="8" :data="item">
                    <Label text="hello"/>
                  </Panel>
                </v-template>
              </RadListView>
          </StackLayout>
        </CardView>
        <CardView 
          col="1" 
          class="box-container" 
          elevation="4" radius="8"           
          marginLeft="5"
          marginBottom="15"
          marginRight="15"
          marginTop="15">
          <StackLayout 
            orientation="vertical" padding="8">
            <GridLayout columns="*" rows="50" class="box-title">
              <Label text="Doing" col="0" class="title"/>
            </GridLayout>
            <RadListView ref="listView2" for="item in doingItems">
              <v-template>
                <Panel marginBottom="8" :data="item" doing="true">
                  <Label text="hello"/>
                </Panel>
              </v-template>
            </RadListView>
          </StackLayout>
        </CardView>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { mapGetters } from "vuex";

import { Menu } from "nativescript-menu";
import sideDrawer from "~/mixins/sideDrawer";
import Panel from "~/components/panel";
import PageOne from "~/screens/PageOne";

const enums = require("tns-core-modules/ui/enums");
const timer = require("tns-core-modules/timer");

export default {
  mixins: [sideDrawer],
  components: {
    Panel
  },
  data() {
    return {
      text: "Hello Page Two!",
      fixedConnectLabelHeight: 0,
      pendingItems: [
        { name: "Item 1", description: "Item 1 description" },
        { name: "Item 2", description: "Item 2 description" },
        { name: "Item 3", description: "Item 3 description" }
      ],
      doingItems: [
        { name: "Item 1", description: "Item 1 description" },
        { name: "Item 2", description: "Item 2 description" },
        { name: "Item 3", description: "Item 3 description" }
      ]
    };
  },
  computed: {
    connection() {
      return this.$store.getters.connection;
    }
  },
  watch: {
    connection: {
      immediate: true,
      handler(val, oldVal) {}
    }
  },
  methods: {
    openMenuUser() {
      Menu.popup({
        view: this.$refs.body.nativeView.getViewById("menu-user"),
        actions: ["Đổi mật khẩu", "Thống kê", "Đăng xuất"]
      })
        .then(val => {
          if (val) alert(val);
        })
        .catch(e => console.log(e));
    },
    openModal() {
      this.$showModal(PageOne, {
        fullscreen: true
      });
    }
  }
};
</script>

<style scoped>
.box-container {
  background-color: rgba(0, 0, 0, 0.02);
}
.box-title {
  vertical-align: center;
  margin-bottom: 15;
}
.title {
  vertical-align: center;
  font-size: 20;
  font-weight: 600;
}
</style>