<template>
  <Page>
    <ActionBar>
      <GridLayout columns="auto, *, auto">
        <Label
          col="1"
          text="NativeScript"
          fontSize="24"
          verticalAlignment="center"
          horizontalAlignment="left"
        />
        <!-- <Button col="2" class="fa btn-rounded" fontSize="14">{{'fa-facebook' | fonticon}}</Button> -->
        <MDRipple col="2" rippleColor="green" width="200" height="200">
          <Label
            text="N"
            fontSize="24"
            verticalAlignment="center"
            horizontalAlignment="left"
            textWrap="true"
          />
        </MDRipple>
      </GridLayout>
    </ActionBar>
    <GridLayout orientation="vertical" rows="auto, *">
      <RadListView
        ref="listView"
        for="item in itemList"
        swipeActions="true"
        @loaded="onLoaded"
        @itemSwipeProgressStarted="onSwipeStarted"
      >
        <v-template>
          <StackLayout padding="16" backgroundColor="#F0F6FF" class="item" orientation="vertical">
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
    onItemTap({ item }) {
      console.log(`Tapped on ${item.name}`);
    },
    onLoaded() {
      setTimeout(() => {
        console.log("Programatic scrolling...");
        this.$refs.listView.scrollToIndex(50);
      }, 500);
    },
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
.btn-rounded {
  width: 60px;
  height: 60px;
  background-color: aqua;
  border-radius: 100;
}
</style>
