<script>
	import { Button } from 'sveltestrap';

	let presentationList = [
		{
			url: "https://youtu.be/2EHuWhpa_Ok?si=7AVpfI_YbVDFzHxh",
			title: "[아우토크립트] SW 개발/설계 입문용 내부세미나(에릭 에반스의 도메인 주도 설계(DDD) 중심으로)",
		},
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
