import React, { useContext, useEffect, useState } from "react";
import tu from "@/styles/tutorial.module.scss";
import { DataContext } from "../src/MyContext";
import { useRouter } from "next/router";

function Tutorial() {
  const { data, who, dataPost, dataShell, sessionWho } = useContext(DataContext);
  const router = useRouter();

  const [talkPage, setTalk] = useState("첫장");
  const [firstGet, setFirstGet] = useState("비활성");
  const [secondGet, setSecondGet] = useState("비활성");

  function page1() {
    setTalk("첫장");
  }
  function page2() {
    setTalk("두번째장");
  }
  function page3() {
    setTalk("세번째장");
  }
  function page4() {
    setTalk("네번째장");
  }
  function page5() {
    setTalk("다섯번째장");
  }
  function page6() {
    setTalk("여섯번째장");
  }
  function page7() {
    setTalk("일곱번째장");
  }
  function page8() {
    setTalk("여덟번째장");
  }
  function page9() {
    setTalk("아홉번째장");
  }
  function page10() {
    setTalk("열번째장");
  }
  function page11() {
    setTalk("열한번째장");
  }
  function page12() {
    setTalk("열두번째장");
  }
  function completePage() {
    setFirstGet("활성");
  }


  async function secondClose() {
    setTalk("END");
    // setBug("활성화")
    setSecondGet("비활성");
    dataShell("put", { SHELL: 10, ID: who.ID });
    await sessionWho();
    router.reload();
  }

  return (
    <>
      <div className={tu.guide}>
        {who.TRIBE == 0 && <img className={tu.bburiJokjang}></img>}
        {who.TRIBE == 1 && <img className={tu.badaJokjang}></img>}
        {who.TRIBE == 2 && <img className={tu.bawiJokjang}></img>}
        {who.TRIBE == 3 && <img className={tu.bamJokjang}></img>}
        {talkPage == "첫장" && (
          <div className={tu.talk}>
            <figure>
              <div>
                <h3>안녕 {who.CODENAME} ! 본스케치에 온걸 환영해.</h3>
                <h3>족장인 내가 본스케치에 대한 간단한 가이드를 해줄게</h3>
              </div>
              <nav>
                <h4 onClick={page2}>다음</h4>
              </nav>
            </figure>
          </div>
        )}
        {talkPage == "두번째장" && (
          <div className={tu.talk}>
            <figure>
              <div>
                <h3>우리는 총 4부족이 있고, 부족 모두 그림을 좋아해.</h3>
                <h3>그래서 우리는 각자가 그린 그림에 문제를 넣어서</h3>
                <h3>맞춘 종족이 그림을 가질수 있는 룰을 만들었어.</h3>
              </div>
              <nav>
                <h4 onClick={page1}>뒤로</h4>
                <h4 onClick={page3}>다음</h4>
              </nav>
            </figure>
          </div>
        )}
        {talkPage == "세번째장" && (
          <div className={tu.talk}>
            <figure>
              <div>
                <h3>
                  이 룰 안에서 모든 그림들은 {`"`}본스케치{`"`} 라고 불러
                </h3>
                <h3>그렇기에 종족에 본스케치의 갯수는 그 부족이 얼마나</h3>
                <h3>번성한지 알수있는 지표야.</h3>
              </div>
              <nav>
                <h4 onClick={page2}>뒤로</h4>
                <h4 onClick={page4}>다음</h4>
              </nav>
            </figure>
          </div>
        )}
        {talkPage == "네번째장" && (
          <div className={tu.talk}>
            <figure>
              <div>
                <h3>그러니 우리 종족에 들어온 만큼 본스케치를</h3>
                <h3>많이 기록하거나, 많은 문제를 맞춰주면 고맙겠어!</h3>
              </div>
              <nav>
                <h4 onClick={page3}>뒤로</h4>
                <h4 onClick={page5}>다음</h4>
              </nav>
            </figure>
          </div>
        )}
        {talkPage == "다섯번째장" && (
          <>
            <div className={tu.tyuDraw}></div>
            <div className={tu.talk}>
              <figure>
                <div>
                  <h3>이제 {who.CODENAME} 너에게 룰을 알려줄게.</h3>
                  <h3>위에 아이콘을 통해 본스케치를 기록할수 있어.</h3>
                  <h3>그림을 기록하는 공간에는 설명서가 있으니 자세히 읽어봐.</h3>
                </div>
                <nav>
                  <h4 onClick={page4}>뒤로</h4>
                  <h4 onClick={page6}>다음</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
        {talkPage == "여섯번째장" && (
          <div className={tu.talk}>
            <figure>
              <div>
                <h3>기록한 본스케치는 자동으로 모두의 본스케치에 전시될거야.</h3>
                <h3>그러니 부족에 피해가 가는 이상한 그림이나 욕설은 기록하면 안돼.</h3>
              </div>
              <nav>
                <h4 onClick={page5}>뒤로</h4>
                <h4 onClick={page7}>다음</h4>
              </nav>
            </figure>
          </div>
        )}
        {talkPage == "일곱번째장" && (
          <>
            <div className={tu.tyuMark}>
              <img></img>
              <img></img>
              <img></img>
              <img></img>
            </div>
            <div className={tu.talk}>
              <figure>
                <div>
                  <h3>그렇게 모두가 너가 낸 본스케치의 문제를 맞춰 점령할 수 있고</h3>
                  <h3>너가 문제를 맞춰 다른 부족의 본스케치를 점령 할 수 있어.</h3>
                  <h3>점령 된 본스케치엔 부족의 마크가 찍힐거야.</h3>
                </div>
                <nav>
                  <h4 onClick={page6}>뒤로</h4>
                  <h4 onClick={page8}>다음</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
        {talkPage == "여덟번째장" && (
          <>
            <div className={tu.tyuGi}>
              <h1>나의 댓글 횟수 : &nbsp;</h1>
              <div>
                <p></p>
                <p></p>
                <p></p>
                <article>
                  <span></span>
                  <span></span>
                  <span></span>
                </article>
              </div>
            </div>

            <div className={tu.talk}>
              <figure>
                <div>
                  <h3>자신이 기록한 본스케치는 점령 할 수 없고,</h3>
                  <h3>다른 본스케치 정답을 맞출 수 있는 기회는 총 세개야.</h3>
                  <h3>세번의 기회안에 맞추지 못하면 본스케치를 점령 할 수 없어.</h3>
                </div>
                <nav>
                  <h4 onClick={page7}>뒤로</h4>
                  <h4 onClick={page9}>다음</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
        {talkPage == "아홉번째장" && (
          <>
            <img className={tu.tyuCoin}></img>

            <div className={tu.talk}>
              <figure>
                <div>
                  <h3>본스케치에 정답이 아닌 글 들이 쌓일수록 맞출 시</h3>
                  <h3>
                    얻을 수 있는 {`"`}조개{`"`}가 늘어날거야.
                  </h3>
                  <h3>여기서 조개는 우리들의 화폐 단위야.</h3>
                </div>
                <nav>
                  <h4 onClick={page8}>뒤로</h4>
                  <h4 onClick={page10}>다음</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
        {talkPage == "열번째장" && (
          <>
            <div className={tu.tyuTool}>
              <img></img>
              <img></img>
              <img></img>
              <img></img>
            </div>

            <div className={tu.talk}>
              <figure>
                <div>
                  <h3>조개는 상점에서 그림도구나 염료등으로 교환 할 수 있어.</h3>
                  <h3>문제를 맞춰 조개를 얻어 도구와 염료로 교환하고,</h3>
                  <h3>늘어난 재료들로 더 좋은 본스케치를 만드는 거야!</h3>
                </div>
                <nav>
                  <h4 onClick={page9}>뒤로</h4>
                  <h4 onClick={page11}>다음</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
        {talkPage == "열한번째장" && (
          <>
            <div className={tu.talk}>
              <figure>
                <div>
                  <h5>
                    {`(`}그럼 우리 부족이 제일 번성해지니까...{`)`}
                  </h5>
                  <h3>흠... 아무튼 설명은 여기까지 할게,</h3>
                  <h3>아무래도 직접 해보는게 이해가 빠를거야.</h3>
                </div>
                <nav>
                  <h4 onClick={page10}>뒤로</h4>
                  <h4 onClick={page12}>다음</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
        {talkPage == "열두번째장" && (
          <>
            <div className={firstGet == "활성" ? tu.addItemOne : tu.hideItem}>
              <figure onClick={firstClose}>
                {who.TRIBE == "0" && (
                  <nav className={tu.bburiItem}>
                    <img></img>
                    <div>
                      <h6>
                        &nbsp;- 그리기 염료 <br />
                        뿌리 지역의 특산물인 <b>푸른 광석</b>을 획득 했습니다.
                      </h6>
                    </div>
                  </nav>
                )}
                {who.TRIBE == "1" && (
                  <nav className={tu.badaItem}>
                    <img></img>
                    <div>
                      <h6>
                        &nbsp;- 그리기 염료 <br />
                        바다 지역의 특산물인 <b>먹물을 머금은 오징어</b>를 획득 했습니다.
                      </h6>
                    </div>
                  </nav>
                )}
                {who.TRIBE == "2" && (
                  <nav className={tu.bawiItem}>
                    <img></img>
                    <div>
                      <h6>
                        &nbsp;- 그리기 염료 <br />
                        바위 지역의 특산물인 <b>구황작물</b>을 획득 <br />
                        했습니다.
                      </h6>
                    </div>
                  </nav>
                )}
                {who.TRIBE == "3" && (
                  <nav className={tu.bamItem}>
                    <img></img>
                    <div>
                      <h6>
                        &nbsp;- 그리기 염료 <br />밤 지역의 특산물인 <b>밤 하늘색 꽃</b>을 획득
                        <br />
                        했습니다.
                      </h6>
                    </div>
                  </nav>
                )}
                <h1>석판을 클릭하면 창이 닫힙니다.</h1>
              </figure>
            </div>

            <div className={secondGet == "활성" ? tu.addItemOne : tu.hideItem}>
              <figure onClick={secondClose}>
                <nav className={tu.shellCoinGet}>
                  <img></img>
                  <div>
                    <h6>
                      &nbsp;- 화폐 <br />
                      모든 부족에게 통용된 화폐인 조개{`(`}10개{`)`}를 획득
                      <br /> 했습니다.
                    </h6>
                  </div>
                </nav>
                <h1>석판을 클릭하면 창이 닫힙니다.</h1>
              </figure>
            </div>

            <div className={tu.talk}>
              <figure>
                <div>
                  <h3>너에게 우리 부족의 특산물과 조개 10개를 줄게.</h3>
                  <h3>우리 부족은 너에게 거는 기대가 커!</h3>
                  <h3>힘내 {who.CODENAME} !</h3>
                </div>
                <nav>
                  <h4 onClick={page11}>뒤로</h4>
                  <h4 onClick={completePage}>완료</h4>
                </nav>
              </figure>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Tutorial;
