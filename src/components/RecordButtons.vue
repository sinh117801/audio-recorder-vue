<script setup lang="ts">
import Recorder from '@/libs/voice-capture/recorder.js';
import { reactive, ref } from 'vue';
// import { useVoiceRecord } from '@/libs/voice-record'

// const { isRecording, startRecord, stopRecord } = useVoiceRecord()
const INSTRUCTION_MESSAGE = "Click icon to start recording message.";
const INSTRUCTION_MESSAGE_STOP = "Click icon again to stop recording.";
const ERROR_MESSAGE = "Failed to use microphone. Please refresh and try again and permit the use of a microphone.";
const SUCCESS_MESSAGE = "Successfully recorded message!";

const isRecording = ref<boolean>(false);
const state = reactive<{
  recordedAudio: any;
  recordedBlob: any;
  recorder: any;
  successMessage: any;
  errorMessage: any;
  instructionMessage: any;
}>({
  recordedAudio: null,
  recordedBlob: null,
  recorder: null,
  successMessage: null,
  errorMessage: null,
  instructionMessage: INSTRUCTION_MESSAGE
});

const emit = defineEmits(['afterRecording']);

function toggleRecording() {
  isRecording.value = !isRecording.value;
  isRecording.value ? initRecorder() : stopRecording();
}

function initRecorder() {
  state.recorder = new Recorder({
    micFailed,
    bitRate: 128,
    sampleRate: 44100,
    format: 'mp3'
  });

  state.recorder.start();
  state.successMessage = null;
  state.errorMessage = null;
  state.instructionMessage = INSTRUCTION_MESSAGE_STOP;
}

function stopRecording() {
  state.recorder.stop();
  const recordList = state.recorder.recordList();
  state.recordedAudio = recordList[0].url;
  state.recordedBlob = recordList[0].blob;
  if (state.recordedAudio) {
    state.successMessage = SUCCESS_MESSAGE;
    state.instructionMessage = null;
  }

  // emit.afterRecording(state.recordedAudio);
  emit('afterRecording', { audio: state.recordedAudio, blob: state.recordedBlob });
}

function micFailed() {
  isRecording.value = false;
  state.instructionMessage = INSTRUCTION_MESSAGE;
  state.errorMessage = ERROR_MESSAGE;
}
</script>

<template>
  <button v-if="!isRecording" @click="toggleRecording">Record</button>
  <button v-else @click="toggleRecording">Stop</button>
</template>