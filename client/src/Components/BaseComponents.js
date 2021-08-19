import styled from "styled-components";

export const Container = styled.section`
  min-height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (max-width: 600px) {
    height: calc(100vh - 55px);
    width: 100vw;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  > input {
    height: 30px;
    border: 1px solid blueviolet;
    border-radius: 6;
    padding: 6px 12px;
  }
`;

export const TopNavigationContainer = styled.nav`
  display: flex;
  position: sticky;
  align-items: center;
  top: 0px;
  background-color: white;
  padding: 5px 0;
  z-index: 1000;
  width: 100%;
  height: 55px;
  border-bottom: 0.5px solid #ebebeb;

  .nav_icon_sty {
    background-color: #e1e1e1;
    border-radius: 40px;
    padding: 4px;
    margin: 0px 8px;
    cursor: pointer;
  }

  .toggle_bars {
    display: none;
  }

  @media (max-width: 600px) {
    width: 100vw;
    position: fixed;

    .toggle_bars {
      display: block;
    }
  }
`;

export const Spacer = styled.div`
  display: none;
  margin: 0;

  @media (max-width: 600px) {
    display: flex;
    margin-top: 55px;
  }
`;

export const FeedCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 0.3px solid #c7c7c7;
  color: black;

  > a {
    text-decoration: none;
  }

  :hover {
    background-color: #f7f7f7;
    color: black;
  }

  .feed_card_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 12px;
  }

  .feed_dp_container {
    display: flex;
    align-items: center;
    border-radius: 25px;
    padding: 5px 15px 5px 5px;
    width: fit-content;
  }

  .feed_dp_container {
    display: flex;
    align-items: center;
    border-radius: 25px;
    padding: 5px 15px 5px 5px;
    width: fit-content;
  }

  .feed_dp {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: auto;
  }

  .feed_card_profile_link {
    text-decoration: none;
    color: black;
    font-size: 15px;
    display: flex;
    padding: 4px 0;

    @media (max-width: 600px) {
      flex-direction: column;
      padding: 0;
    }
  }

  .feed_card_profile_link p {
    font-weight: bold;
    margin: 0px;
    padding: 0px;
  }

  .feed_card_profile_link span {
    color: grey;
    margin-left: 8px;
    padding: 0px;

    @media (max-width: 600px) {
      margin-left: 0;
    }
  }

  .timestamp {
    font-size: 12px;
    margin: 0px 0px 5px 0px;
    padding: 0px;
  }

  .feed_media_container {
    margin-left: auto;
    margin-right: 10px;
  }

  .feed_btm_icn {
    display: flex;
    padding: 5px 12px;
    border-radius: 30px;
    margin: 0 12px;
    cursor: pointer;
  }
  .feed_dp {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: auto;
  }

  .feed_card_profile_link {
    text-decoration: none;
    color: black;
    font-size: 15px;
    display: flex;
    padding: 4px 0;
  }

  .mainmenubtn {
    cursor: pointer;
    margin-bottom: auto;
    margin-top: 8px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;
