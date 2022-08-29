import {writable} from "svelte/store"
export let wrongCount = writable(0)
export let wrongIndex = writable(0)
export let wrongSequence = writable(false)
export let caretPos =writable(0)
export let seconds=writable(0);
export let remaining_time = writable(0)
export let time = writable(15)
export let language = writable("javascript")
export let text_data=writable("");
export let line_count = writable(0)
export let word_count =writable(0)
export let finished=writable(false)
export let prev_word_start_position:Writable<number|undefined>=writable(0)
export let prev_word_end_position:Writable<number|undefined>=writable(0)
export let interval:Writable<NodeJS.Timer|undefined>=writable(undefined);
export let chart_data:Writable<number>=writable([])