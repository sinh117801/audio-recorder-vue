<script setup lang="ts">
import RecordButtons from '@/components/RecordButtons.vue';
import { reactive } from 'vue';

const state = reactive<{ audioSrc: any; blobSrc: any }>({
  audioSrc: null,
  blobSrc: null
})

function handleAfterRecording({ audio, blob }: { audio: any; blob: any }): void {
  state.audioSrc = audio;
  state.blobSrc = blob;
}
</script>

<template>
  <record-buttons @after-recording="handleAfterRecording"></record-buttons>
  <figure class="mt-8">
    <audio controls :src="state.audioSrc" type="audio/mpeg" class="mx-auto">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <figcaption class="text-sm mt-2">Listen to your recording before submitting.</figcaption>
  </figure>
</template>
