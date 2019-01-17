<template>
  <Page ref="body" androidStatusBarBackground="white" statusBarStyle="light">
    <ActionBar backgroundColor="white">
      <GridLayout columns="auto, *, auto">
        <MDButton
          col="0"
          class="fa btn-icon"
          rippleColor="rgba(0,0,0,0.08)"
          :text="'fa-cog' | fonticon"
          color="black"
          verticalAlignment="center"
          horizontalAlignment="left"
          elevation="0"
          variant="flat"
        />
        <Label
          col="1"
          text="Image Picker"
          fontSize="24"
          verticalAlignment="middle"
          horizontalAlignment="left"
        />
      </GridLayout>
    </ActionBar>
    <StackLayout>
      <Button text="Image Picker" @tap="imagePickerHandler"/>
      <StackLayout v-if="imagesPicker.length >0" orientation="horizontal">
        <Image
          v-for="(image, index) in imagesPicker"
          :key="index"
          :src="image.android"
          stretch="fill"
          width="200"
          height="200"
          paddingRight="15"
        />
      </StackLayout>
      <Button text="Get Image" @tap="getImageFromStorage"/>
      <WebView v-if="uri" :src="uri"/>
    </StackLayout>
  </Page>
</template>
<script>
const fs = require("file-system");
const imagePicker = require("nativescript-imagepicker");
export default {
  data() {
    return {
      imagesPicker: [],
      uri: null
    };
  },
  methods: {
    imagePickerHandler() {
      let context = imagePicker.create({
        mode: "multiple"
      });
      this.uploadFile(context);
    },
    uploadFile(context) {
      context
        .authorize()
        .then(() => {
          return context.present();
        })
        .then(selection => {
          this.imagesPicker = [...selection];
          let images = selection.map(selected =>
            fs.File.fromPath(selected.android)
          );
          return images;
        })
        .then(images => {
          for (let image of images) {
            let milliseconds = new Date().getTime();
            let extension = image.extension;
            let fileName = `image${milliseconds}${extension}`;

            this.$firebase.storage
              .uploadFile({
                remoteFullPath: `uploads/images/${fileName}`,
                localFile: image,
                onProgress: function(status) {
                  console.log("Uploaded fraction: " + status.fractionCompleted);
                  console.log(
                    "Percentage complete: " + status.percentageCompleted
                  );
                }
              })
              .then(
                function(uploadedFile) {
                  console.log("File uploaded: " + JSON.stringify(uploadedFile));
                },
                function(error) {
                  console.log("File upload error: " + error);
                }
              );
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    getImageFromStorage() {
      this.$firebase.storage
        .getDownloadUrl({
          remoteFullPath: "uploads/images/image1547613273824.jpg"
        })
        .then(
          function(url) {
            this.uri = url;
            console.log("Remote URL: " + url);
          },
          function(error) {
            console.log("Error: " + error);
          }
        );
    }
  }
};
</script>
