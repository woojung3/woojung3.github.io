---
title: 켄트 벡의 Tidy First
date: "2024-04-19"
---

## 켄트 백의 소프트웨어 설계 시리즈
- 이 책은 시리즈 중 첫번째 책임. 소프트웨어 가치사슬에서 소프트웨어 설계는 여전히 가장 약한 고리이며 도구의 발전에 비교했을 때 큰 발전을 이루지 못함.  **머지않아 소프트웨어 설계도 강한 고리가 되는 것을 목표**로 이 시리즈를 집필중.
- 시리즈 주제(예정):
	- 1권: 각자가 스스로 할 수 있는 소프트웨어 설계(이 책, Tidy First)
	- 2권: 소프트웨어 설계를 통해 팀 내 프로그래머 사이에 관계를 증진하는 방법
	- 3권: 비즈니스와 기술 사이의 관계

> "Make the change easy, then make the easy change" or MCETMEC

**누구를 위한 책인가?**
 - 프로그래머, 수석 개발자, 직접 개발하는 아키텍트, 기술 관리자

**무엇을 배울 수 있는가?**
- 시스템의 동작을 변경하는 일과 구조를 변경하는 일의 근본적인 차이점
- 각자가 스스로 코드를 변경하는 프로그래머로서 구조 변경과 동작 변경에 대한 투자를 병행하는 비법
- 소프트웨어 설계가 작동하는 방식과 이에 작용하는 힘에 대한 이론의 기본 사항
- 더불어...:
	- 때로는 코드 정리를 먼저 하고, 때로는 코드 정리를 나중에 하는 식으로 프로그래밍 경험 개선하기
	- 큰 변경을 작고 안전한 단계로 시작하기
	- 다양한 행동 장려책과 함께 하나의 인간 활동으로 소프트웨어 설계 준비하기

---

## Part 01 코드 정리법
> 노트: 코드 정리는 마치 미니어처 같은 아주 작은 리팩터링입니다. 각각의 짧은 장마다 코드 정리 방법을 다룹니다. 코드 정리 적용 전과 후를 대비하는 코드를 예로 들어 설명합니다.
> - Part 1은 일종의 카탈로그입니다. 이 카탈로그는 코드 변경을 위해 지저분한 코드를 마주칠 때마다 적용할 수 있는 작은 설계 움직임(move)을 다룹니다

### Chapter 01 보호 구문
```cpp
if (조건)
	if (다른 조건 부정)
		... 코드 ...
```

위와 같은 코드는 조건이 중첩되어 있어서 헷갈린다. 다음과 같이 정리할 수 있다:

```cpp
if (조건 부정) return
if (다른 조건) return

... 코드 ...
```

이러한 코드는 '코드의 세부 사항을 살펴보기 전에 염두에 두어야 할 몇 가지 전제 조건이 있습니다'로 읽힌다.
단, 보호 구문을 남용하지는 않아야 한다. 보호 구문을 사용하다 보면 습관적으로 7~8개의 보호 구문이 걸리곤 한다. 이런 구문은 오히려 읽기 까다롭다.

### Chapter 02 안 쓰는 코드
지워라. 그게 다다. 실행되지 않는 코드라면 지워버려라. 지웠다가 다시 필요해지면 형상 관리 도구를 사용하라.
리플렉션 같은 코드는 사용이 안 되는 것이 정말 맞는지 염려가 될 수 있다. 걱정이 된다면 조금씩 지우면서 테스트 운영을 해보고 확신이 설 때까지 기다려보라.

### Chapter 03 대칭으로 맞추기
여러 군데에서 패턴적으로 사용되는 코드가 있다면 모양을 일치시켜라. 두 가지 이상의 패턴을 섞어 쓰면 혼란스러워진다. 코드를 읽을 때 기존과 다르다면 '다른 동작의 코드가 아닐까?' 라고 오해할 수 있다.

### Chapter 04 새로운 인터페이스로 기존 루틴 부르기
기존 인터페이스가 어렵거나, 복잡하거나, 혼란스럽거나, 지루하다면 호출하고 싶은 인터페이스를 새롭게 구현한 뒤 기존 인터페이스는 새롭게 구현한 인터페이스가 단순히 호출하는 방식으로만 사용되게 만들어라.
기존 인터페이스 호출이 새 인터페이스 호출로 모두 이전되었다면 새 인터페이스가 직접 루틴을 구현하도록 변경할 수 있다.
이런 인터페이스를 통로 인터페이스(pass-through interface) 라고 부른다.

### Chapter 05 읽는 순서
코드를 작성할 때는 읽기 좋은 순서로 정렬하라. 코드는 읽히는 일이 더 많음을 기억하라.
한 번에 여러 가지 정리를 하려고 하지는 않아도 좋다. 여러 가지 정리를 섞어서 하지 마라.

### Chapter 06 응집도를 높이는 배치
함께 변경되는 요소들을 가까이 배치하라.
결합도(coupling)를 제거하려거든 아래 수식에 대해 생각해보라:
- `결합도 제거 비용 + 변경 비용 < 결합도에 따른 비용 + 변경 비용`

응집도가 좋아지면 결합도도 좋아진다.

### Chapter 07 선언과 초기화를 함께 옮기기
```cpp
fn()
	int a
	... 변수 a를 사용하지 않는 코드
	a = ...
	int b
	... 변수 a를 사용할 수 있으나 변수 b를 사용하지 않는 코드
	b = ...a...
	... 변수 b를 사용하는 코드
```

대신에

```cpp
fn()
	... 변수 a를 사용하지 않는 코드
	int a = ...
	... 변수 a는 사용하고 변수 b는 사용하지 않는 코드
	int b = ...a...
	... 변수 b를 사용하는 코드
```

처럼 작성해보라. 변수를 사용하기 직전에 선언하고 초기화하는 것이 읽기 쉽다.

### Chapter 08 설명하는 변수
코드의 표현식이 어렵고 크고 복잡하다면 전체에서 일부 표현식을 추출한 후 표현식의 의도가 드러나도록 변수 이름을 만들어 할당해보라:

```cpp
return new Point(
	... 긴 표현식 ...,
	... 다른 긴 표현식 ...
)
```

대신에

```cpp
x := ... 긴 표현식 ...,
y := ... 다른 긴 표현식 ...,
return new Point(x, y)
```

처럼 작성해보라. 당신이 이번에 어렵게 파악한 내용이 다음에는 쉽게 읽힐 것이다.
 
### Chapter 09 설명하는 상수
의미가 있는 상수라면 상징적인 값으로 바꾸어라. 다음의 코드

```cpp
if response.code = 404
	... 코드 ...
```

대신에

```cpp
PAGE_NOT_FOUND := 404
if response.code = PAGE_NOT_FOUND
	... 코드 ...
```

와 같이 작성하라.

### Chapter 10 명시적인 매개변수
매개변수가 명확하지 않으면(블록으로 전달되는 등) 코드를 읽으면서도 어떤 데이터가 필요한지 알기 어렵다.

```cpp
params = { a: 1, b: 2 }
foo(params)

function foo(params)
	... params.a ...
	... params.b ...
```

대신에

```cpp
function foo(params)
	foo_body(params.a, params.b)

function foo_body(a, b)
	... a ...
	... b ...
```

와 같이 작성하라.

### Chapter 11 비슷한 코드끼리
로직이 변경될 때에는 변경되는 부분에 빈 줄을 넣어 로직을 분리하라. 관련 있는 코드를 뭉쳐두는 것이 좋다.
### Chapter 12 도우미 추출
목적이 분명하지만 나머지 코드와는 상호작용이 적은 코드 블록이 있다면 도우미 함수로 분리하라. 이 정리법은 리팩터링의 '메서드 추출' 법이다.

### Chapter 13 하나의 더미
코드 작성 시 가장 큰 비용이 들어가는 일은 코드 작성이 아니라 읽고 이해하기 위한 비용이다. 한 번에 머릿속에 기억하고 있어야 할 코드의 내용이 줄어들수록 생산성이 증가한다.
코드가 흩어져 있다면 필요한 만큼의 코드를 하나의 더미(one pile) 처럼 느껴질 때까지 모은 뒤 정리하라.

### Chapter 14 설명하는 주석
코드를 읽다가 '아, 이건 이렇게 돌아가는 거구나!' 라는 깨달음이 왔다면, 깨달음을 주석으로 기록하라. 다음 사람(나 자신일 수도 있다)의 시간을 절약해 줄 수 있다.
결함을 발견했다면 그 즉시 해당 위치에 주석을 달아야 한다.

### Chapter 15 불필요한 주석 지우기
코드만으로 내용을 모두 이해할 수 있다면 주석은 삭제하라. DRY.

---

## Part 02 관리
> 노트: 다음은 코드 정리 절차 관리를 다룹니다. 저(켄트 벡)의 코드 정리 철학은 코드 정리를 결코 큰일로 다루지 않습니다. 코드를 정리하는 일이 반드시 보고해야 하고, 추적하고, 계획하고, 일정을 잡아야 하는 일이 되어서는 안 됩니다. 특정 코드를 변경해야 하는데 코드가 지저분해서 변경하기 어려울 때, 먼저 코드를 정리하는 것입니다. 일상적인 업무이자, 생각하면서 개선하는 절차입니다.
> - 코드 정리는 괴짜들의 자기 관리임
> - Tidy First? 에 물음표를 붙인 이유는, 코드 정리법을 적용할 수 있다고 해서 반드시 코드를 정리하라는 말이 아님을 강조하고 싶어서임
> - 코드 정리를 통해 소프트웨어 설계에 입문할 수 있음. 사소한 코드 정리가 규모 있는 리팩터링을 이끎
> - Part 2에서는 코드 정리를 개인 개발 흐름에 맞추는 방법에 대해 설명함:
> 	- 코드 정리를 언제 시작해야 하는가?
> 	- 코드 정리를 언제 멈추어야 하는가?
> 	- 코드의 구조를 변경하는 코드 정리와 시스템의 동작 변경을 어떻게 결합할 수 있을까?

### Chapter 16 코드 정리 구분
여기에서는 풀 리퀘스트(PR)과 코드 리뷰(코드 검토) 모델을 사용한다고 가정한다(다른 모델에 대해서는 나중에 설명한다). 코드 정리는 어디서 해야 하는 것일까?

다음은 코드 정리 PR을 올릴 때의 볼썽사나은 모습의 예시이다:
- '동작 변경 코드(업무)'와 '코드 정리 내용(소규모 리팩터링)'을 PR에 첨부함
- 리뷰어가 PR이 너무 길다고 불평함
- 코드의 내용을 분할하여 동작 변경 코드 PR과 코드 정리 PR을 별도로 올림
- 검토하는 사람들이 코드 정리만 담긴 PR을 무슨 의미로 올렸는지 모르겠다고 불평함
- 다시 최초로 돌아감

코드 정리를 하지 않는다면 몰라도 코드 정리를 한다면 어딘가에서는 검토를 수행해야 한다. 그러면 어디서 해야 할까?
**요약하자면, 코드 정리는 별도의 PR로 만들되, 가급적 PR당 몇 개의 코드 정리만 넣는 식으로 내용을 명확하게 하고 분량을 줄이도록 한다.**

동작 변경을 B(Behavior)로 표기하고, 구조 변경(코드 정리)을 S(Structure)로 표기하자.

PR에 B와 S를 무분별하게 섞는다면(예: BSSBSSSBBS 와 같은 대규모 PR) 쉽게 엉망이 되어버리고 리뷰어들의 역할이 자연스럽게 축소된다(리뷰어가 할 수 있는 말이 없다).

따라서 우리는 변경 사항을 나누어 별도의 PR로 만들어야 한다. 순서가 있는 일련의 코드 변경을 PR 한 개로 묶어라. BSSBSSSBBS는 다음과 같이 6개의 PR로 분리되어야 한다:
- B | SS | B | SSS | BB | S

솔직히 말해 이렇게 PR을 나눌지, 아니면 BSSBSSSBBS로 처리할지는 장단점이 있는 선택이다. 무엇이 더 이로울지는 당신의 조직에 맞추어서 판단해야 한다. 크고 포괄적인 PR은 전체 그림을 보여주지만, 리뷰어의 활동에 심각한 방해물이 된다. 반대로 작은 PR은 리뷰어가 쉽게 활동할 수 있게 해 주지만, PR 자체가 잡초처럼 무시될 수 있는 여지를 만든다.

작은 PR은 보통 검토 시간을 단축시킨다. 큰 PR은 검토 시간을 길게 만드는데, 코드가 느리게 검토될수록 더 큰 PR들이 생기는 결과가 초래된다. 이는 향후 검토를 더욱 느리게 만든다.

조직이 코드 정리에 익숙해지고, 작은 단위 작업에 익숙해지고, 안전하게 작업하는 데 익숙해졌다면 코드 정리 PR은 검토하지 않는 용기를 내는 것도 한 가지 방법이 될 수 있다.

### Chapter 17 연쇄적인 정리
코드 정리는 자꾸 손이 가는 감자칩과 같다. 한 개를 먹으면 바로 또 먹고 싶어지는 식이다. 따라서 코드를 계속 정리하고 싶은 충동을 관리하는 것도 코드 정리의 핵심 기술이다. 방금 정리했지만 또 정리해야 할 수도 있고, 정리를 끊어야 할 수도 있다.

Part 1의 내용을 하나씩 실천해보며 자신만의 습관을 붙여보라. 코드 구조를 대대적으로 바꾸려고 코드 정리를 시작하는 경우가 많은데, 너무 많이, 너무 빠르게 변경하지 않도록 주의하라. 대개 작은 정리를 순차적으로 성공시키는 것이 무리한 정리로 실패하는 것보다 시간을 아껴준다. 악보의 음표를 다루듯 코드를 정리하라. 음표가 깨끗하고 편안할 때 이를 이용해서 더 좋은 멜로디를 만들 수 있다.
### Chapter 18 코드 정리의 일괄 처리량
통합과 배포를 하기 전에 코드 정리를 어느 정도 크기로 수행해야 할까?
Chapter 16에서는 코드 정리와 동작 변경을 섞지 않는 것에 대해 설명했다. 하지만 모든 코드 정리를 한꺼번에 할 것인지(예: SSSSSS | B), 아니면 모두 개별적으로 할 것인지(예: S | S | S | S | S | S | B), 아니면 그 중간을 택할 것인지에는 이론의 여지가 있다. 고려해야 하는 비용은 무엇일까?

처리 규모가 커질수록 **다른 사람의 작업과의 충돌의 위험**이 커지고, **병합 비용**이 오르는 등 상당히 많은 비용이 든다. 비용을 줄이고자 한다면 '코드 정리' 갯수를 늘려서 '동작 변경'에 필요한 비용을 낮춰라. 그러면 검토 비용도 함께 줄어들게 된다.

여러분과 여러분의 팀은 검토 비용을 줄일 수 있는 방법을 찾아야 한다. '코드 정리'의 갯수를 늘이되, '일괄 처리'의 규모는 낮춰라. 조직에 신뢰와 강력한 문화가 있다면 코드 정리 후에는 굳이 검토하지 않는 것도 방법이다.

### Chapter 19 리듬
Chapter 18에서 코드 정리할 때는 한번에 처리하는 규모를 작게 하기를 권했다.
- 즉, SSSSSS | B 대신에 S | S | S | S | S | S | B 로 처리하기를 권했다

코드 정리를 관리하는 기술에는 정리의 리듬을 관리하는 일도 있다.
하나의 코드 정리는 몇 분에서 한 시간 정도로만 수행하라.
- 한 번의 코드 정리에 한 시간 이상이 걸린다면, 이는 **원하는 동작 변경을 위해 필요한 최소한의 구조 변경 시기를 놓쳤다는 의미**일 수 있다

동작 변경은 코드 안에 뭉쳐서 나타나는 경향이 있다. 파레토 법칙에 따르면 80%의 변경 사항이 20%의 파일에서 발생한다. 코드 정리를 선행하는 것의 탁월한 장점은 코드 정리 내용이 뭉쳐진다는 것이다. 코드 정리가 코드를 뭉친 결과는 동작 변경하기에 좋은 위치가 되어 있을 것이다.
- 코드 정리를 지속적으로 수행하면, 대부분의 변경 작업은 이미 정리된 코드 안에서 이루어지게 된다
- 시스템에 있는 대부분의 코드는 그대로지만 정리되지 않은 코드를 만나는 일이 급격히 줄어들 것이다

### Chapter 20 얽힘 풀기
**실타래를 풀려면 실이 엉켜 있다는 사실을 알아차려야 한다.** 여러분이 어떤 코드의 동작 변경을 하고 있다고 가정하자. 이 때, 변경을 쉽게 할 코드 정리를 찾아내어서 코드 정리를 함께 진행하였다. 그런 다음 새로운 테스트 케이스를 작성하였고, 동작을 변경하였다. 그랬더니 코드 정리할 곳이 또 눈에 띄어서 수정을 하고... 이렇게 한 시간을 씨름하고 난 결과...:
- 변경 대상인 동작을 모두 알게 되었고
- 그 동작들을 쉽게 변경하려면, 어떤 코드를 정리해야 하는지 모두 알게 되었으나
- **정리한 코드와 변경할 동작이 함께 얽혀 버렸다**

이를 해결하기 위한 세 가지 선택이 있지만...:
- 그대로 배포한다. 검토하는 사람들이 무례함을 느낄 수 있고, 오류가 발생하기 쉽지만 일은 해결된다
- 코드 정리와 변경 사항을 별도의 하나 이상의 PR로 나누거나 하나의 PR을 여러 번의 커밋으로 나눌 수 있다. 이렇게 작업하면 팀의 분위기를 해치지 않을 수 있으나(무례함을 줄일 수 있으나) 작업 횟수가 늘어난다
- 진행 중인 작업을 버리고, 코드 정리를 선행하는 순서로 다시 시작한다. 이렇게 하면 작업은 더 많아지지만, 이어지는 커밋과의 일관성은 분명해진다

매몰 비용의 오류로 셋 중의 하나를 선택하는 것이 어려워진다. 이미 통과한 테스트를 버리라고 어떻게 설득할 것인가?
- 대답은 항상 같다. 우리가 작성하는 코드는 컴퓨터에 지시할 뿐만 아니라, 여러분의 의도를 동료 및 관계자에게 설명할 수 있어야 한다. 컴퓨터에게 빠르게 지시하는 것만이 중요한 것이 아니다

처음부터 세 번째 선택과 같이 작업하라.
처음으로 코드 정리를 하기로 마음먹고 진행할 때, 먼저 정리할 것인지 나중에 정리할 것인지 고민하다가 코드 정리와 동작 변경 사이에서 전환 시점을 놓치기 일쑤일 것이다. '코드 정리'를 먼저 수행하고, '동작 변경'을 수행하도록 하되, 한 번에 처리하는 규모는 작게 하도록 하라.

'선후'에 대해 이야기했으니 Chapter 21에서는 '시점'에 대해 이야기하겠다.

### Chapter 21 코드 정리 시점
- 아예 안 한다
	- '고장 나지 않으면 고치지도 말자'가 통하는 시스템도 있다
- 나중에 정리한다
	- '정말로' 나중에 할 것이라면, 나중에 코드를 정리해도 무방하다
	- 그러나 회사에서 일한다면 일할 시간은 항상 '충분하지 않을 것'이다
	- '재미 목록'을 만들자:
		- 나중에 정리할 대상들을 목록으로 만든다
		- 시간이 남는다면 목록에서 하나씩 꺼내 처리해본다
- 동작 변경 후에 코드를 정리한다
	- 지금 정리하는 것이 더 저렴하다면 지금 한다
		- 방금 고친 코드를 다시 고칠 예정인데, 지금 수정해야 맥락을 알고 있어서 쉽게 할 수 있는 경우 등
	- 코드 정리하는 데 드는 시간이 동작 변경에 사용한 시간과 거의 비슷할 때라면 바로 한다
- 코드 정리 후에 동작을 변경한다
	- 이 책이 코드 정리를 선행하기를 강조하였지만, 실무에서는 상황에 따라 다르게 행동해야 한다
	- 스스로에게 아래 질문을 해 보라:
		- 지저분한 상태 그대로 코드를 변경한다면 일이 얼마나 더 어려운가? 코드를 정리한다고 해서 더 쉬워지는 일이 생기지 않거나 크게 얻는 것이 없다면 먼저 정리하지 마라
		- 코드 정리의 이점을 바로 얻을 수 있는가? 아직 동작 변경 준비가 되지 않았다고 가정해보자. 이해를 위해 코드를 읽는 중이다. 코드를 정리하면 더 빨리 이해할 수 있겠다는 판단이 섰다면 코드 정리를 먼저 하라
		- 코드 정리에 드는 비용을 보상받을 수 있는지 생각해보라. 이 코드를 변경할 일이 많지 않다면 코드 정리를 제한하는 편이 좋다. 코드 정리로 지속적인 보상을 받거나 큰 보상을 받을 수 있다면 먼저 하라
		- 코드 정리에 대해 얼마나 확신하고 있는가? 추정할 때에는 의심하는 마음을 가져야 한다

일반적으로 코드를 먼저 정리하는 것을 권장하지만, 정리 그 자체를 목적으로 삼지 않도록 경계해야 한다. 이 책의 Part 01에서 제시한 코드 정리 카탈로그는 아주 작기 때문에 적용할 때 과도한 생각이 필요하지 않을 것이다.

- **요약:**
	- **다음 상황에서는 코드 정리를 하지 마라:**
		- 앞으로 다시는 코드를 변경할 일이 없을 때
		- 설계를 개선하더라도 배울 것/얻을 것이 없을 때
	- **다음 상황에서는 나중으로 정리를 미루라:**
		- 정리할 코드 분량이 많은데, 보상이 바로 보이지 않을 때
		- 코드 정리에 대한 보상이 잠재적일 때
		- 작은 묶음으로 여러 번에 나눠서 코드 정리를 할 수 있을 때
	- **다음 상황에서는 동작 변경 후에 정리하라:**
		- 다음 코드 정리까지 기다릴수록 비용이 더 불어날 때
		- 코드 정리를 하지 않으면 일을 끝냈다는 느낌이 들지 않을 때
	- **다음 상황에서는 코드 정리 후에 동작 변경을 하라:**
		- 코드 정리를 수행하면 코드 이해가 쉬워지는 경우, 혹은 동작 변경이 쉬워지는 즉각적인 효과를 얻을 수 있을 때
		- 어떤 코드를 어떻게 정리해야 하는지 알고 있을 때

---

## Part 03 이론
> 노트: '소프트웨어 설계는 인간관계 속에서 벌어지는 활동입니다' 라는 말은 무슨 뜻일까요? 여기서 말하는 인간이란 누구인가요? 어떻게 하면 더 나은 소프트웨어 설계를 통해 이들의 요구를 더 잘 충족시킬 수 있을까요? 소프트웨어 비용은 왜 그렇게 많이 들까요? 이에 대해 우리가 할 수 있는 일은 무엇일까요(스포일러 주의: 소프트웨어 설계)? 결합도? 응집도? 멱법칙?
> - 중요한 것은, 이론만으로는 설득할 수 없다는 것이다. 하지만 이론을 이해하면 최적의 응용이 가능하다. 소프트웨어 설계에서는 영원한 질문이 있다:
> 	- 언제 소프트웨어 설계 결정을 시작해야 하는가?
> 	- 언제 소프트웨어 설계 결정을 수정하고 시스템의 동작을 변경해야 하는가?
> 	- 다음 결정은 어떻게 내릴 것인가?
> 	- *이러한 질문은 매번 합리적으로 논리적으로 답할 수 없다. 결정하는 시점에 합리적이고 논리적인 답을 찾기 위해 필요한 정보가 존재하지 않는 경우가 많기 때문이다*
> - 이론을 이해하면, 이러한 질문에 추측으로 답해야 할 때를 대비해 판단력을 높일 수 있다
> - Part 3에서는 다음과 같은 질문을 다룬다(*비용!*):
> 	- 소프트웨어 설계란 무엇인가?
> 	- 소프트웨어 설계가 소프트웨어 개발과 운영 비용을 어떻게 좌우하는가? 반대로, 소프트웨어 개발과 운영 비용이 소프트웨어 설계를 어떻게 좌우하는가?
> 	- 소프트웨어 구조에 투자할 때와 투자하지 않을 때의 장단점은 무엇인가?
> 	- 소프트웨어의 구조를 변경할지 여부와 방법을 결정할 때 어떤 경제적, 인간적 원칙을 사용할 수 있는가?

### Chapter 22 요소들을 유익하게 관계 맺는 일
'소프트웨어 설계'란 무엇일까? 여기에서는 '소프트웨어 설계의 의미'를 '요소들을 유익하게 관계 맺는 일'이라고 말하도록 하겠다. '요소', '유익', '관계'에 대해 부연설명하겠다:
- 요소:
	- 토큰 → 식(expression) → 문(statement) → 함수 → 객체/모듈 → 시스템
	- 요소에는 경계가 있어 어디서 시작하고 어디서 끝나는지 구별할 수 있다
- 관계 맺기:
	- 관계 주도 개발에서 말하는 **역할, 책임, 협력** 부분이다
	- 요소들은 서로 호출하고 호출받는 관계를 맺는다
- 유익하게:
	- 요소들 사이의 관계가 잘 드러나고 유의미적일 수 있도록 해야 한다
	- 기계를 위해서만 코드를 작성하지 말고, 중간 요소를 만들어 사람을 위해 코드를 작성하라
- 요소들을 유익하게 관계 맺는 일:
	- 그래서 설계란 무엇일까?
	- 설계를 구성하는 요소들과 그들의 관계, 그리고 그 관계에서 파생되는 이점이 바로 설계이다
	- 이 관점에서 소프트웨어 설계자는 오직 다음과 같은 일만 할 수 있다:
		- 요소를 만들고 삭제한다
		- 관계를 만들고 삭제한다
		- 관계의 이점을 높인다

### Chapter 23 구조와 동작
소프트웨어는 두 가지 방식으로 가치를 만든다:
- 현재 소프트웨어가 하는 일
- 미래에 새로운 일을 시킬 수 있는 가능성

1달러를 투자하면 10달러가 나오는 소프트웨어가 있다고 하자. 이것이 '현재 소프트웨어가 하는 일' 이다. 이 소프트웨어보다 더 좋은 것은 무엇일까? 10달러를 넣을 때마다 100달러를 내놓는 기계이다. 어떻게 하면 더 나은 기계에 도달할 수 있을까? 이것이 '미래에 새로운 일을 시킬 수 있는 가능성' 이다.

후자와 같은 선택의 가능성을 앗아가는 요소는 무엇일까? 몇 가지 예시이다:
- 핵심 직원의 퇴사
- 고객과의 거리가 멀어짐(고객의 요구(needs)가 줄어들거나, 고객과의 사이가 나빠짐)
- 변경에 따른 비용이 매우 큼

첫번째, 두번째는 이 책에서 직접적으로 다루지 않지만, 세 번째에 대해서만은 대응할 수 있다. 변경이 쉬운 구조는 미래의 기회를 만든다.

**문제는 구조가 동작처럼 또렷하게 드러나지는 않는다는 점이다.** 제품 로드맵이 기능이나 동작 변경 목록으로 구성되는 데에는 이유가 있다. 이전에는 없던 버튼이 나타나는 식의 동작 변경은 쉽게 알아볼 수 있기 때문이다.
선택 가능성을 유지하고 확장하기 위해 구조에 투자해야 함을 알고 있다 해도, **실제로 투자했는지 알아보기 어렵기 때문에 관리하기 쉽지 않다**. 그래서 사람들이 동작 변경과 달리 구조 변경에 대해 혼란스러운 태도를 보이는 것이다. 이 책이 그러한 혼란에 대한 답을 명확하게 주는 것은 아니나, 한가지 근본적인 차이점을 이해하면 도움이 될 것이다. **구조 변경은 되돌릴 수 있다**. 즉, 가역성을 가진다.

### Chapter 24 경제 이론: 시간 가치와 선택 가능성
괴짜(프로그래머, Geek)의 욕망과 돈의 명령이 충돌하면 돈이 승리하게 되어있다. 잠시간 괴짜가 승리하는 것 처럼 보일지도 모르나, **결국에는 돈이 이긴다.**

돈의 본성은 두 가지 놀라운 속성을 지닌다:
- 오늘의 1달러가 내일의 1달러보다 더 가치가 있기 때문에 버는 것은 빨리 하고, 쓰는 것은 가능한 뒤로 미뤄야 한다
- 혼란스러운 상황에서는 어떤 물건에 대한 옵션이 물건 자체보다 낫기 때문에 불확실성에 맞서는 옵션을 만든다

이 두 가지 속성은 때때로 충돌한다. 지금 돈을 벌려면 미래의 옵션이 줄어들 수 있다. 하지만 지금 돈을 벌지 못하면 미래의 옵션을 행사할 여력이 없어질 수도 있다.

다음 두 장은 '순현재 가치(Net Present Value, NPV)'와 '옵션 그릭스(options greeks)'에 대해 다룬다.

### Chapter 25 오늘의 1달러가 내일의 1달러보다 크다
오늘의 1달러는 내일의 1달러보다 크다. 소프트웨어 시스템에는 이 사실이 어떻게 적용될까?
지금 당장 돈을 벌고 나중에 코드를 정리하는 행동 변화를 실천할 수 있다면, 먼저 돈을 벌고 나중에 돈을 쓸 수 있을 것이다. 다만 이 결정이 트레이드 오프임을 기억하라. 앞서 언급했듯이 선행 코드 정리는 코드 정리와 뒤따르는 동작 변경의 비용 합계가 코드를 정리하지 않고 동작 변경을 하는 경우보다 더 적은 경우에 유효하다. 이런 경우에는 항상 먼저 정리하라.

다음 장의 옵션 가치는 종종 시간 가치와 충돌한다. 이 점이 여러분에게 즐거운 시간을 줄 것이다.

### Chapter 26 옵션
앞 장에서는 소프트웨어 시스템의 경제적 가치를 할인된 미래 현금흐름의 합으로 설명하였다. 이번에는 옵션을 통해 설명하겠다.

금융 옵션의 매개변수는 다음과 같다:
- 매수할 수 있는 기초자산
- 기초자산의 가격, 해당 가격의 변동성을 포함한 가격
- 옵션의 프리미엄 또는 현재 우리가 지불하는 가격
- 옵션의 기간 또는 기초자산을 구매할지 여부를 결정해야 하는 기간

이것이 소프트웨어 설계에는 어떤 의미를 가질까? 소프트웨어 설계는 변화를 위한 준비, 즉 동작 변경에 대한 준비이다:
- 잠재적인 동작 변경의 가치가 클수록 더 좋다
- 개발 기간이 길면 길수록 좋다
- 앞으로 더 저렴하게 개발할 수 있다면 더 좋겠지만, 가치에 큰 영향을 미치지는 않는다
- 더 작은 설계 작업으로 옵션을 만들 수 있다면 좋다

'옵션을 만드는 것과 동작을 변경하는 것의 균형'은 어떻게 잡아야 할까?

### Chapter 27 옵션과 현금흐름 비교
우리는 이 책을 통해 '코드 정리가 먼저인가? (**Tidy First?**)' 라는 질문의 답을 찾아나가고 있다.

- 현금흐름할인(Chapter 25)은 코드 정리를 먼저 하지 말기를 권한다
- 옵션(Chapter 26)은 코드 정리를 선행하기를 권한다

코드 정리를 선행해야 하는가? 그럴 수도 있고, 아닐 수도 있다.
확실히 코드 정리부터 해야 하는 경우는 다음과 같다:
`비용(코드 정리) + 비용(코드 정리 후 동작 변경) < 비용(바로 동작 변경)`

위 수식이 성립한다면 코드 정리부터 수행하라. 지나친 비용을 들이지 않도록 어느 정도까지 정리할 것인지 경계를 잘 설정하는 것은 중요하다.

판단하기 곤란한 상황은 다음과 같다:
`비용(코드 정리) + 비용(코드 정리 후 동작 변경) > 비용(바로 동작 변경)`

많은 개발자들은 위와 같은 상황에서 '자기 관리로서의 코드 정리'를 수행한다. 이 또한 업무를 정당화할 수 있는 이유이기는 하나, 경제적 인센티브에 반하는 행동임을 명확하게 인지하도록 하자.

대부분의 경우, 몇 분에서 몇 시간에 이르는 코드 정리 규모에서 우리는 코드 정리의 경제성을 정확하게 계산할 수 없으며, 계산하려고 시도할 필요도 없다. 우리는 두 가지 중요한 형태의 판단력을 길러야 한다:
- 소프트웨어 설계의 시기와 범위에 영향을 미치는 인센티브를 인식하는 데에 익숙해지기
	- ex: 설계에 더 많은 시간을 할애하고 싶은데 반발이 너무 심해요, 무슨 일일까요?
- 대인 관계 기술을 우리 자신에게 연습해서, 나중에 밀접하게 일하는 동료로부터 더 넓은 범위의 동료에게까지 활용하기

판단력을 기르는 위와 같은 연습을 꾸준히 한다면, 제품의 생존과 번영이 걸려 있는 중요한 순간이 되었을 때, 어떻게 설계해야 하고 어디서 설계를 멈춰야 하는지 직감적으로 알 수 있게 된다.

(결국은 감이고, 감을 설득하는 과정이 필요하다. 소프트웨어 설계는 인간관계 속에서 벌어지는 활동이다)

### Chapter 28 되돌릴 수 있는 구조 변경
구조 변경은 대체로 되돌릴 수 있다. 동작 변경은 대체적으로 되돌리기 어렵다. 되돌릴 수 있는 결정은 되돌릴 수 없는 결정과 다르게 취급해야 한다. 되돌릴 수 없는 결정에 대해서 면밀히 검토하는 일은 매우 가치 있는 일이다.
반면 되돌릴 수 있는 결정은 신경 쓸 정도로 큰 일이 아닐 수 있다. 지나치게 노력할 필요가 없다. '코드 정리'를 진짜 '정리'로 만들어라. 그냥 정리일 뿐이다.

코드 리뷰 절차는 되돌릴 수 있는 변경 사항(코드 정리)와 되돌릴 수 없는 변경 사항(동작 변경)을 구분하지 않는다. 결국 너무나 다른 결과를 초래하는 일에 시간 낭비를 하는 꼴이 된다.

프로그래머들은 모든 상황을 이상적으로 생각하는 경향이 있다. 결코 실수하는 일 없이 더 나은 의사결정을 매번 내리는 일이 가능할까? '가역성'에 집중하고, 가역적인 일에 자원을 낭비하지 말아야 한다.

### Chapter 29 결합도
(참고: A Daily Practice of Empirical Software Design)

결합도와 응집도에 대한 개념을 처음으로 제시한 에드워드 요던과 래리 콘스탄틴의 고전적인 저서인 'Structured Design'은 1975년에 발간되었다. 요던과 콘스탄틴이 수행한 조사에서, 비싼 프로그램은 한 요소를 변경하기 위해 함께 변경해야 하는 요소가 많았고, 저렴한 프로그램은 좁은 범위의 코드 변경만 필요한 경향이 있었다.

결합도는 이러한 변경 감영 특성을 의미한다. 한 요소를 변경하면 다른 요소도 함께 변경해야 하는 경우, 두 요소는 특정 변경과 관련하여 서로 결합되어 있는 것이다.

결합도 분석은 단순히 소스 코드를 보는 것만으로는 부족하다. 두 요소가 결합되어 있는지 여부를 판단하려면, 먼저 어떤 변경이 발생하거나 발생할 가능성이 있는지 알아야 한다. 일어나지 않는 변화와 관련되어 결합되어 있더라도 그러한 결합은 우리가 관심을 가질 필요가 없다.
- 결합된 파일은 하나의 커밋에 자주 함께 등장하는 경향이 있다

결합도는 소프트웨어 비용을 결정한다.
결합도가 두 요소만의 문제라면 큰 문제가 아니었을 것이다. 결합도를 주목하는 이유는 결합도가 가진 두 가지 성질 때문이다:
- 일대 다(1-N)
	- 어떤 변경이 일어나면, 한 요소는 여러 결합된 요소의 변화를 유발한다
- 연쇄작용(Cascading)
	- 변경은 파급된다. 소프트웨어 설계를 통해 연쇄성을 어느 정도 낮출 수 있다(확률과 규모)

이 서비스가 저 서비스와 결합된다고 말을 할 때, **어떤 변경과 관련한 결합**인지도 생각할 필요가 있다.
다시 한 번 강조하자면, 결합도가 소프트웨어 비용을 좌우한다.

### Chapter 30 콘스탄틴의 등가성
소프트웨어 개발 비용의 70%가 유지보수 비용이라는 말이 있다. 무엇이 우리를 개발한 비용의 두 배를 운영에 지출하게 만드는가? Structured Design에서 에드워드 요던과 래리 콘스탄틴의 소프트웨어 설계의 목표는 소프트웨어의 비용을 최소화하는 것이라고 가정하였다(가치를 극대화하는 것도 목표이지만 따로 다루겠다).

콘스탄틴의 등가성은 이 책에서 이름 붙인 용어이다. 이 용어의 뜻은, '소프트웨어 비용은 그것을 변경하는 데 드는 비용과 거의 같다' 는 것이다:
- `비용(소프트웨어) ~= 비용(변경)`

소프트웨어는 출시 후 비용 증가의 기울기가 훨씬 더 가파르다. 이유는 무엇일까? 많이 변경하기 때문인 것일까? 물론 그것도 있지만, 한편으로는 기존 시스템과의 마찰이 있기 때문이다. 변화를 거부하는 시스템이 비용을 만든다.

멱법칙(power law)은 가끔 파레토의 법칙으로 소개되기도 하는데, 멱법칙을 따르는 시스템은 상위 몇 %가 전체의 대부분의 차지하고 나머지들이 긴 꼬리(long tail)을 형성하게 된다(예: 일정 인구 이상의 도시는 소수이며 나머지 도시는 long tail상에 위치한다). 가장 큰 지진 다섯 개가 작은 지진 만 개보다 더 큰 피해를 입힌다.

소프트웨어에 멱법칙을 적용하면, 가장 비용이 많이 드는 하나의 변경이 나머지 변경을 모두 합친 것보다 비싸다는 말로 표현할 수 있겠다:
- `비용(전체 변경) ~= 비용(큰 변경들)`

큰 변경이 비싼 이유는 명확하다. 결합도가 높기 때문이다. 따라서 소프트웨어 비용은 결합도와 거의 같다:
- `비용(큰 변경들) ~= 결합도`

이제 우리는 콘스탄틴의 등식을 얻었다:
- `비용(소프트웨어) ~= 비용(전체 변경) ~= 비용(큰 변경들) ~= 결합도`
- 설계의 중요성을 강조하기 위해, 다음과 같이 표현해보겠다:
	- `비용(소프트웨어) ~= 결합도`

따라서, 소프트웨어의 비용을 줄이기 위해 우리는 결합도를 줄여야 한다. 하지만 결합도를 줄이는 것은 공짜가 아니며, 트레이드 오프의 영역이며, 절충점을 찾아야 하는 일이다. 이유를 살펴보겠다.

### Chapter 31 결합도와 결합도 제거
커플링(결합)이 변화를 막기 때문에 커플링을 줄이는 것이 개발비용에 도움이 된다. 그러나 커플링을 줄이는 것도 트레이드오프이다. 모든 것을 디커플링하는 것은 가능하지 않고, 새로운 요구사항이 들어왔을 때 그 형상이 유지될 수도 없다.

'한 종류의 코드 변경에 대한 결합도를 줄일수록 다른 종류의 코드 변경에 대한 결합도는 커진다'. 이것이 의미하는 실질적인 의미는, 모든 결합을 다 색출해내서 없애려고 애쓰지 말아야 한다는 것이다. 결합을 무조건 없애려고 하기보다, 배치하는 것이 중요하다. 다음 장을 보자.

### Chapter 32 응집도
결합된 요소들은 둘을 포함하는 같은 요소의 하위 요소여야 한다. 이것이 응집도가 내포하는 첫 번째 의미이다.

응집도는 결국 결합도이다. 결합도가 있어야 하는 요소들을 가까운 위치에 배치하는 것이 응집도의 핵심이다:
- 응집도가 있는 하위 요소 추출: 
	- 도우미 함수를 추출하는 등
- 결합되지 않은 요소를 별개 요소로 분리하기:
	- 조금 더 큰 설계 결정이 된다

중요한 것은 한 번에 한 요소씩 정리하는 것이다. 다음에 코드를 볼 사람을 위해 조금씩이나마 코드를 정리하라. 모두가 스카우트 규칙을 따른다면 시간이 지날수록 더 보기 좋고 다루기 좋은 코드가 될 것이다.

### Chapter 33 결론
코드 정리가 먼저인가(Tidy First)? 결정에 영향을 미치는 사항을 다시 한번 반복해보자:
- 비용: 
	- 코드를 정리하면 비용이 줄어드는가? 아니라면 나중에 하는 편이 좋은가? 아니라면 줄일 수 있는 가능성이 있을까?
- 수익:
	- 코드를 정리하면 수익이 더 커질까? 혹은 더 빨라지거나 커질 가능성이 생기는가?
- 결합도:
	- 코드를 정리하면 변경에 필요한 요소의 수가 줄어드는가?
- 응집도:
	- 코드를 정리하면 변경을 더 작고 좁은 범위로 집중시켜 더 적은 수의 요소만 다룰 수 있게 될까?

가장 중요한 것은 여러분의 자세이다. 코드를 정리하면서 평화, 만족, 기쁨을 느낄 수 있는가? 그럴 수도 있고, 그것이 중요하다. 이것이 중요한 이유는 여러분이 최상의 상태에서 주체적으로 일할 때, 더 나은 프로그래머가 될 수 있기 때문이다. 항상 시간에 쫓기며 고치기 힘든 코드를 변경하느라 고통 속에 있다면 최상의 상태가 될 수 없다.

코드 정리에 너무 집착하지 마라. 코드 정리는 소프트웨어 설계의 프링글스와 같다. 프링글스 뚜껑을 열고 나면 멈추기 힘든 것과 같이 코드 정리도 멈추기 힘든 마력이 있다. 충동을 억제하라.

---

> 요약:
> 시리즈의 첫 번째 책인 이 책은 개인에 의한, 개인을 위한 소프트웨어 설계에 대해 다루었다. 물론 동료들도 깔끔한 코드의 혜택을 받을 수 있겠지만, 이 책의 초점은 여러분에게 맞춰져 있다. 여러분이 더 쉽게 작업하는 데 도움이 된다면 투자할 가치가 있는 것이 아닐까?

| 권   | 누가?           | 언제?        | 무엇을?    | 어떻게?      | 왜?       |
| --- | ------------- | ---------- | ------- | --------- | -------- |
| 1권  | 여러분           | 몇 분에서 몇 시간 | 코드 정리   | 구조나 동작 변경 | 결합도와 응집도 |
| 2권  | 여러분과 동료 프로그래머 | 며칠에서 몇 주   | 리팩터링    | 주간 단위 계획  | 멱법칙      |
| 3권  | 모든 이해관계자들     | 몇 달에서 몇 년  | 아키텍처 진화 | 동적 균형     | ?        |

<br>
위와 같은 내용으로 시리즈가 예정되어 있다. 너무 멀리 내다보고 계획하지 않는 것이 좋지만, 여러분의 기술의 궁극적인 보상은 자신이 다른 사람들과 더 잘 지내는 것이다. 비즈니스 지향적인 사람들과 기술 지향적인 사람들 사이의 관계는 가장 어려운 관계 중 하나이지만, 가장 중요하고 잠재적으로 가장 보람 있는 관계이기도 하다. 소프트웨어 설계를 일상적인 비즈니스와 전략 계획의 일부로 삼는다면 비즈니스와 기술 사이의 균열을 치유하는 데에 기여할 수 있을 것이다.

소프트웨어 설계가 인간관계 속에서 벌어지는 진솔한 활동이 될 수 있도록 하자는 것이 취지이다. 그래서 어떻게 시작해야 할 것인가...
**코드 정리를 먼저 할 것인가?** 그게 좋을 **수도** 있다.

---

## 요약
켄트 벡의 소프트웨어 설계 3부작(예정) 시리즈의 첫 번째 책. 개인이 시도할 수 있는 소규모 리팩터링 습관들과, 습관을 유지하기 위한 절차, 그리고 그에 대한 이유를 다룬다.
- 코드 정리(Tidy)를 먼저(First) 하는 것을 일반 지침으로 권하나, 상황에 따라서는 유연하게 행동하라는 내용이다. 케이스 바이 케이스라는 뜻에서 ?를 제목에 붙였다고 한다(Tidy First? 에 물음표를 붙인 이유는, 코드 정리법을 적용할 수 있다고 해서 반드시 코드를 정리하라는 말이 아님을 강조하고 싶어서)
- 소프트웨어 설계의 목적, 의의, 그리고 비용 관점에서의 '코드 정리'에 대한 내용이다
