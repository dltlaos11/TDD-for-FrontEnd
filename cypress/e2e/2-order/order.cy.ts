import { expect } from "chai";
describe("주문을 테스트 한다.", () => {
  it("사용자는 배달/포장 중 원하는 유형을 선택할 수 있다.", () => {
    cy.visit("/");

    cy.get("[data-cy=deliveryBtn]").should("be.visible").as("deliveryBtn");
    cy.get("[data-cy=pickupBtn]").should("be.visible").as("pickupBtn");
    // be.visible, exist
    // <OrderTypeBtn onClick={handleOrderTypeClick} data-cy={testId} />

    cy.get("@deliveryBtn").click();
    // @... -> alias
    cy.url().should("include", "/food-type");
  });

  it("사용자는 음식 종류를 선택할 수 있다.", () => {
    cy.visit("/food-type");

    cy.intercept(
      {
        method: "GET",
        url: "/restaurant/food-type",
      },
      [
        {
          id: 1,
          name: "피자",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-pizza.png",
        },
        {
          id: 2,
          name: "동남아",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-asian.png",
        },
        {
          id: 3,
          name: "햄버거",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-burger.png",
        },
        {
          id: 4,
          name: "디저트",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-cake.png",
        },
        {
          id: 5,
          name: "치킨",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-chicken.png",
        },
        {
          id: 6,
          name: "탕,찌개",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-hotpot.png",
        },
        {
          id: 7,
          name: "고기",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-meat.png",
        },
        {
          id: 8,
          name: "중식",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-noodle.png",
        },
        {
          id: 9,
          name: "샐러드",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-salad.png",
        },
      ]
    );

    cy.get("[data-cy=1]").should("be.visible").as("pizzaBtn");
    cy.get("@pizzaBtn").click();

    cy.url().should("include", "food-type/1");
  });

  it("사용자는 원하는 레스토랑을 선택할 수 있다.", () => {
    cy.visit("/food-type/1");
    cy.intercept(
      {
        method: "GET",
        url: "/restaurant/food-type/1",
      },
      { fixture: "restaurant-list.json" }
      // cypress가 만들어주는 폴더 중 fixtures가 있다. 여러 곳에서 사용되는 고정 값을 의미
      // 5개만 나옴
      // fixture -> 가독성향상, 코드 줄이기
    );

    cy.intercept(
      {
        method: "GET",
        url: "/restaurant/food-type/1",
      },
      { fixture: "restaurant-list.json" }
    );

    cy.fixture("restaurant-list.json").then((restaurantList) => {
      cy.get(`[data-cy="${restaurantList[0].id}"]`)
        .should("be.visible")
        .as("targetRestaurantBtn");
      cy.get("@targetRestaurantBtn").click();
      cy.url().should("include", "/restaurant/1");
    });
    // fixture에 있는 값 사용 가능
  });
  // Recoil은 테스트 코드에서 RecoilHook을 사용할 수 있는 방법이 없다.
  // RecoilObserver 태그 안에서 useRecoilState(setName을 바로 사용할 수 없고,
  // event를 통해서 e.g. onClick)를 활용한 event를 발생시키는 방법 사용
  // Recoil에서 제공하는 hook을 사용해서 직접적으로 값을 변경할 수는 없고 hook을 사용해서 값을 변경하는 이벤트 핸들러를 활용해야 한다.
  // Recoil에서 제공하는 값도, jsx tag에 접근해서 읽어야한다.
  // visit을 바로 하면 Recoil값 바로 사용 불가능(전역변수 존재 ❌)
  // 새로운 it을 추가하는게 아니라 order로 들어갔을 때 장바구니에서 아이템 개수를 변경하는 것을 테스트

  it("사용자가 원하는 메뉴를 장바구니에 담고, 원하는 음식 갯수를 변경할 수 있다.", () => {
    cy.visit("/restaurant/1");
    cy.intercept(
      {
        method: "GET",
        url: "/restaurant/1",
      },
      {
        fixture: "menu.json",
      }
    );
    cy.fixture("menu.json").then((menu) => {
      cy.get(`[data-cy=${menu.menu_set[0].id}]`)
        .should("be.visible")
        .as("foodBtn");
      cy.get("@foodBtn").click();

      cy.url().should("include", "/order");

      // `counter`를 활용해 atom에 접근
      cy.get("[data-cy=counter]").as("counter").as("counter");
      // btn이나 input은 equal을 봤는데 CounterSection(section태그)은 `.contain()`으로 값을 가지고 있는지 확인해야
      cy.get("@counter").should("contain", 1);

      // 버튼의 `onClick` 이벤트를 활용해 atom 값 변경
      cy.get('[data-cy="incrementBtn"]')
        .should("be.visible")
        .as("incrementBtn");
      cy.get("@incrementBtn").click(); // 1추가 -> 2

      cy.get("@counter").should("contain", 2);

      cy.get('[data-cy="decrementBtn"]')
        .should("be.visible")
        .as("decrementBtn");
      cy.get("@decrementBtn").click(); // 1감소 -> 1

      cy.get("@counter").should("contain", 1);

      cy.get('[data-cy="completeBtn"]').should("be.visible").as("completeBtn");
      cy.get("@completeBtn").click();

      // cy.url().should((url) => {
      //   const currentUrl = new URL(url);
      //   expect(currentUrl.pathname).to.equal("/");
      // });
      cy.url().should((url) => {
        const currentUrl = new URL(url);
        expect(currentUrl.pathname).to.equal("/");
      });
    });
  });
});
