<template>
  <Page ref="body" androidStatusBarBackground="white" statusBarStyle="light">
    <ActionBar backgroundColor="white">
      <NavigationButton visibility="hidden"></NavigationButton>
      <GridLayout columns="auto, *, auto">
        <Label
          col="1"
          text="NativeScript"
          fontSize="24"
          verticalAlignment="center"
          horizontalAlignment="left"
        />
        <StackLayout col="2" orientation="horizontal">
          <MDButton
            class="mdi btn-icon"
            rippleColor="rgba(0,0,0,0.08)"
            :text="'mdi-settings' | fonticon"
            color="black"
            elevation="0"
            variant="flat"
            @tap="goToAnimationPage"
          />
          <MDButton
            class="fa btn-icon"
            rippleColor="rgba(0,0,0,0.08)"
            :text="'fa-bell' | fonticon"
            color="black"
            elevation="0"
            variant="flat"
            @tap="openDrawer"
          />
          <MDButton
            class="fa btn-icon"
            rippleColor="rgba(0,0,0,0.08)"
            :text="'fa-user' | fonticon"
            elevation="0"
            color="black"
            variant="flat"
            id="menu-user"
            ref="menu"
            @tap="openMenuUser"
          />
        </StackLayout>
      </GridLayout>
    </ActionBar>
    <GridLayout ~mainContent orientation="vertical" rows="auto, *">
      <RadListView
        ref="listView"
        for="item in itemList"
        swipeActions="true"
        @itemSwipeProgressStarted="onSwipeStarted"
      >
        <v-template>
          <StackLayout padding="16" backgroundColor="white" class="item" orientation="vertical">
            <Label fontSize="24" color="#0A255A" class="big" :text="item.name"></Label>
            <Label padding="8,0" color="#B3B6C8" :text="item.description"></Label>
          </StackLayout>
        </v-template>

        <v-template name="itemswipe">
          <GridLayout columns="auto, *, auto">
            <StackLayout
              id="mark-view"
              col="0"
              backgroundColor="#2340CB"
              class="swipe-item left"
              orientation="horizontal"
              @tap="onLeftSwipeClick"
            >
              <Label
                text="mark"
                padding="12"
                color="white"
                verticalAlignment="center"
                horizontalAlignment="center"
              />
            </StackLayout>
            <StackLayout
              id="delete-view"
              col="2"
              class="swipe-item right"
              orientation="horizontal"
              @tap="onRightSwipeClick"
            >
              <Label
                text="delete"
                padding="12"
                color="white"
                verticalAlignment="center"
                horizontalAlignment="center"
              />
            </StackLayout>
          </GridLayout>
        </v-template>
      </RadListView>
    </GridLayout>
  </Page>
</template>
<script>
import { Menu } from "nativescript-menu";
import routes from "../router";
import sideDrawer from "~/mixins/sideDrawer";
import Animation from "~/screens/Animation";

const getItemList = count => {
  let itemList = [];
  for (let i = 1; i <= count; i++) {
    itemList.push({
      id: i,
      name: `Item ${i}`,
      description: `Item ${i} description`
    });
  }
  return itemList;
};

export default {
  mixins: [sideDrawer],
  data() {
    return {
      scrollOffset: 0,
      itemList: getItemList(100),
      collection: this.$firebase.firestore.collection("tasks")
    };
  },
  computed: {
    scrollText() {
      return `Scrolled to ${this.scrollOffset} offset`;
    }
  },
  methods: {
    openMenuUser() {
      Menu.popup({
        view: this.$refs.body.nativeView.getViewById("menu-user"),
        actions: ["Đổi mật khẩu", "Thống kê", "Đăng xuất"]
      })
        .then(val => {
          switch (val) {
            case "Đăng xuất":
              this.$store.dispatch("logout").then(() => {
                this.$storage.remove("token");
                this.$navigateTo(routes.LoggedOut, {
                  animated: true,
                  transition: {
                    name: "slideRight",
                    duration: 250,
                    curve: "easeIn"
                  }
                });
              });
              break;
          }
        })
        .catch(e => console.log(e));
    },
    goToAnimationPage() {
      this.$navigateTo(Animation, {
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 250,
          curve: "easeIn"
        }
      });
    },
    onItemTap({ item }) {
      console.log(`Tapped on ${item.name}`);
    },
    // onLoaded() {
    //   setTimeout(() => {
    //     console.log("Programatic scrolling...");
    //     this.$refs.listView.scrollToIndex(50);
    //   }, 500);
    // },
    onScrolled({ scrollOffset }) {
      this.scrollOffset = scrollOffset;
    },
    onSwipeStarted({ data, object }) {
      console.log(`Swipe started`);
      const swipeLimits = data.swipeLimits;
      const swipeView = object;
      const leftItem = swipeView.getViewById("mark-view");
      const rightItem = swipeView.getViewById("delete-view");
      swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    },
    onLeftSwipeClick(event) {
      console.log("left action tapped");
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    onRightSwipeClick({ object }) {
      console.log("right action tapped");
      // remove item
      this.itemList.splice(this.itemList.indexOf(object.bindingContext), 1);
      this.$refs.listView.notifySwipeToExecuteFinished();
    }
  },
  mounted() {
    this.collection.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });

      querySnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log(`Add task id: ${change.doc.id}`);
        }
        if (change.type === "modified") {
          console.log(`Modified task id: ${change.doc.id}`);
        }
        if (change.type === "removed") {
          console.log(`Removed task id: ${change.doc.id}`);
        }
      });
    });
  }
};
</script>
<style scoped>
</style>
