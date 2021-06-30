<template>
  <div id="options-app">
    <el-container class="options-container">
      <el-header class="options-header">
        <h1>Quickly open multiple URLs</h1>
      </el-header>
      <el-main>
        <el-input
          v-model="textarea"
          type="textarea"
          autofocus
          :autosize="{ minRows: 6, maxRows: 12 }"
          :placeholder="$ui.get('optionsInputPlaceholder')"
          @change="onTextChange"
        ></el-input>
        <div class="options-settings">
          <span class="options-label">
            {{ $ui.get('optionsInterval') }}
          </span>
          <el-input-number
            v-model="interval"
            size="mini"
            :min="0"
            :max="1000"
            :step="100"
            step-strictly
            controls-position="right"
            @change="onIntervalChange"
          ></el-input-number>
        </div>
        <div class="options-settings">
          <a class="options-shortcuts" target="_blank" @click="onShortcuts">
            {{ $ui.get('optionsShortcuts') }}
          </a>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      textarea: '',
      interval: 500,
      urls: [],
    };
  },
  methods: {
    onTextChange(text) {
      this.urls = this.$ui.textHandler(text);
      chrome.storage.local.set(
        {
          urls: this.urls,
        },
        () => {
          this.$notify({
            title: this.$ui.get('notifySave'),
            message: this.$ui.get('notifySaveMsg'),
            type: 'success',
            duration: 2000,
          });
        }
      );
      this.textarea = this.urls.join('\n');
    },
    onIntervalChange(num) {
      chrome.storage.local.set({
        interval: Math.round(num / 100) * 100,
      });
    },
    onShortcuts(e) {
      e.stopPropagation();
      chrome.tabs.create({
        url: 'chrome://extensions/shortcuts#:~:text=Quickly%20open%20multiple%20URLs',
      });
    },
  },
  mounted() {
    chrome.storage.local.get(['interval', 'urls'], res => {
      this.interval = res.interval || 500;
      const urls = res.urls || [];
      Object.assign(this.urls, urls);
      if (urls.length > 0) {
        const str = urls.join('\n');
        this.textarea = str;
      }
    });
  },
};
</script>

<style>
.options-settings {
  margin-top: 25px;
}
.options-label,
.options-shortcuts {
  font-size: 18px;
}
.options-shortcuts {
  color: #1890ff;
  cursor: pointer;
}
</style>
