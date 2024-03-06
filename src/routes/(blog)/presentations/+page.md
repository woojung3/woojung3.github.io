<script>
	let presentationList = [
		{
			url: "https://youtu.be/2EHuWhpa_Ok?si=7AVpfI_YbVDFzHxh",
			title: "SW 개발/설계 입문용 사내 세미나(에릭 에반스의 도메인 주도 설계(DDD) 중심으로)",
		},
		{
			url: "https://woojung3.github.io/new_leader_guide/",
			title: "그룹 리더 가이드",
		},
		{
			url: "/html/2023-01-28_rust/index.html",
			title: "reveal.js 연습(comprehensive rust)",
		}
	];
</script>

# Presentations

<ul>
{#each presentationList as presentation }
	<li><a href="{presentation.url}">{presentation.title}</a></li>
{/each}
</ul>
