<template lang="html">
  <ScrollView>
    <StackLayout width="100%">
      <GridLayout columns="*, 70" rows="70">
        <Label 
          col="0" 
          fontSize="24" 
          text="Drawer"
          paddingLeft="15"
          fontWeight="600"
          verticalAlignment="center"/>
        <MDButton
            col="1"
            class="fa btn-icon"
            backgroundColor="transparent"
            color="#607D8B"
            rippleColor="rgba(0,0,0,0.08)"
            verticalAlignment="center"
            horizontalAlignment="right"
            :text="'fa-times' | fonticon"
            elevation="0"
            variant="flat"
            @tap="closeDrawer"
          />
      </GridLayout>
      <Label
        v-for="(page, i) in pages"
        @tap="goToPage(page.component)"
        class="drawer-item"
        :text="page.name"
        :key="i"
      />
    </StackLayout>
  </ScrollView>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
export default {
  mixins: [sideDrawer],
  data () {
    return {
      pages: [
        { name: 'Home', component: this.$routes.Home },
        { name: 'Page One', component: this.$routes.PageOne },
        { name: 'Page Two', component: this.$routes.PageTwo }
      ]
    }
  },
  methods: {
    goToPage (pageComponent) {
      this.$navigateTo(pageComponent)
      this.closeDrawer()
    }
  }
}
</script>

<style lang="css">
</style>