<script>
	import { Button } from 'sveltestrap';

	let presentationList = [
		{
			url: "https://woojung3.github.io/new_leader_guide/",
			title: "AutoCrypt V2X.platform 그룹 리더 가이드",
		},
		{
			url: "/html/2023-01-28_rust/index.html",
			title: "Comprehensive Rust (reveal.js 학습용)",
		}
	];
</script>

# Presentations

<ul>
{#each presentationList as presentation }
	<li><a href="{presentation.url}">{presentation.title}</a></li>
{/each}
</ul>