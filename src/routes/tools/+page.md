<script>
	import { paginate, LightPaginationNav } from 'svelte-paginate'

	let korean = true;
	let chinese = false;
	let japanese = false;
	let western = false;
	let chicken = false;
	let snack = false;
	let etc = false;

	let item = "";

	function randomItem(items) {

		if (items.length === 0)
		{
			item = "항목 없음!"
		}
		else
		{
			item = items[Math.floor(Math.random()*items.length)].name + ": " + items[Math.floor(Math.random()*items.length)].detail;
		}
	}

	function filterItems(items) {
		let ret = []

		ret = items.filter(item => (
			item.hasOwnProperty('korean') && korean ? true : false ||
			item.hasOwnProperty('chinese') && chinese ? true : false ||
			item.hasOwnProperty('japanese') && japanese ? true : false ||
			item.hasOwnProperty('western') && western ? true : false ||
			item.hasOwnProperty('chicken') && chicken ? true : false ||
			item.hasOwnProperty('snack') && snack ? true : false ||
			item.hasOwnProperty('etc') && etc ? true : false
		))

		return ret
	}

	let restaurants = [
		{ name: '모던식당', detail: '신한드림리버 지하1층 쌀밥 맛집', korean: true },
		{ name: '창고43', detail: '소고기 맛집. 비쌈', korean: true },
		{ name: '서평옥', detail: '이북식 탕반집. 순복음교회 버스정류장', korean: true },
		{ name: '복음식당', detail: '저렴한 한식집', korean: true },
		{ name: '리153', detail: '만원 중식 뷔페', chinese: true },
		{ name: '카레와돈까스', detail: '돈까스와 순두부', korean: true, japanese: true },
		{ name: '김삼보', detail: '김치찌개와 계란말이. 조금 멈', korean: true },
		{ name: '장호왕곱창', detail: '김치찌개와 짤라. 조금 비쌈', korean: true },
		{ name: '정인면옥', detail: '양많이로 주문하면 사리가 하나 더', korean: true },
		{ name: '소호정', detail: '순복음교회 앞 안동국시', korean: true },
		{ name: '천지면옥', detail: '순복음교회 앞 냉면집', korean: true },
		{ name: '청기와타운', detail: '고깃집', korean: true },
		{ name: '카니발피자', detail: '피자집', western: true },
		{ name: '깐부치킨', detail: '국힘 당사 2층 치킨집', chicken: true },
		{ name: '호화반점', detail: '은근 맛있는 그곳', chinese: true },
		{ name: '용호동낙지', detail: '국힘 당사 옆집', korean: true },
		{ name: '고봉삼계탕', detail: '삼계탕집 여기뿐임', korean: true },
		{ name: '진진만두국', detail: '한번도 안가봤습니다', korean: true },
		{ name: '종로계림닭도리탕', detail: '양푼이 스타일 닭도리탕. 양많음', korean: true, chicken: true },
		{ name: '엄나무집', detail: '춘천닭갈비 맛집. 전화하면 미리 준비해줌', korean: true },
		{ name: '새싹비빔밥', detail: '돌판비빔밥. 생각보다 양많음', korean: true },
		{ name: '함경진순대', detail: '순대국밥 등', korean: true },
		{ name: '더덮', detail: '저렴한 덮밥집', korean: true, japanese: true },
		{ name: '동해복국', detail: '평범한 복집', korean: true },
		{ name: '정우칼국수보쌈', detail: '칼국수와 보쌈. 약간 조미료맛 남', korean: true },
		{ name: '금화쿵푸', detail: '마라탕', chinese: true },
		{ name: '동해도', detail: '점심에 가면 회전초밥 무한 세트가 있음', japanese: true },
		{ name: '영월촌놈', detail: '맛은 김삼보 열화판. 공간은 쾌적', korean: true },
		{ name: '킹콩부대찌개', detail: '대한미국놈 부대찌개', korean: true },
		{ name: '바스버거', detail: '감튀가 무제한인 그곳', western: true },
		{ name: '하동관', detail: '역사와 전통의 국밥집', korean: true },
		{ name: '겐카츠', detail: '고급 돈까스집', japanese: true },
		{ name: '국회도서관', detail: '구내식당. 맛있지만 붐빔', korean: true },
		{ name: '국회박물관', detail: '구내식당. 조금 덜 맛있지만 안붐비고 조금 더 가까움', korean: true },
		{ name: '오늘은즉떡', detail: '제일 가까운 떡볶이집', korean: true, snack: true },
		{ name: '도시해장국', detail: '정우빌딩 지하1층 제주도식 해장국', korean: true },
		{ name: '백원', detail: 'CCMM빌딩 뷰맛집', chinese: true }
	]

	let items = restaurants

	let currentPage = 1
	let pageSize = 5
	$: paginatedItems = paginate({ items, pageSize, currentPage })
</script>

# 점심 선택기
## 전체 식당 목록
<ul class="items">
  {#each paginatedItems as {name, detail}, i}
	<li class="item"> {name}: {detail} </li>
  {/each}
</ul>

<LightPaginationNav
  totalItems="{items.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{1}"
  showStepOptions="{true}"
  on:setPage="{(e) => currentPage = e.detail.page}"
/>

<br>

## 옵션

<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" bind:checked={korean}>
  <label class="form-check-label" for="flexCheckDefault">
    한식
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" bind:checked={chinese}>
  <label class="form-check-label" for="flexCheckChecked">
    중식
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" bind:checked={japanese}>
  <label class="form-check-label" for="flexCheckChecked">
    일식
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" bind:checked={western}>
  <label class="form-check-label" for="flexCheckChecked">
    양식
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" bind:checked={chicken}>
  <label class="form-check-label" for="flexCheckChecked">
    치킨
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" bind:checked={snack}>
  <label class="form-check-label" for="flexCheckChecked">
    분식
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" bind:checked={etc}>
  <label class="form-check-label" for="flexCheckChecked">
    기타
  </label>
</div>

<br>

<button on:click="{() => randomItem(filterItems(restaurants))}">
{#if item === ""}
	운명의 시간!
{:else}
	재도전!
{/if}
</button>

{#if item === ""}

{:else}
<br><br>

## 결과

- {item}

{/if}