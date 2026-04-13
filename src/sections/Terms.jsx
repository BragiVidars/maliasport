import './Terms.css'

export default function Terms() {
  return (
    <section className="terms" id="skilmalar">
      <div className="terms__inner">
        <div className="terms__header">
          <span className="terms__eyebrow">Skilmálar</span>
          <h2 className="terms__title">
            SKILMÁLAR<br />
            <span>MALÍA SPORT EHF.</span>
          </h2>
          <p className="terms__subtitle">
            Við staðfestingu pöntunar skuldbinda viðskiptavinir sig til að samþykkja þessa skilmála.
          </p>
        </div>

        <div className="terms__grid">
          <div className="terms__block">
            <h3 className="terms__block-title">Greiðslumátar</h3>
            <p>
              Öll verð hjá Malía sport ehf. eru í íslenskum krónum með virðisaukaskatti (VSK).
              Sendingarkostnaður bætist við þegar við á, áður en greiðslu lýkur.
            </p>
            <p>
              Hægt er að greiða með greiðslukorti í gegnum örugga greiðslugátt. Malía sport ehf.
              áskilur sér rétt til að leiðrétta augljósar villur í verði og/eða vörulýsingu.
              Ef slíkt kemur upp bjóðum við upp á kaup á réttu verði eða fulla endurgreiðslu — þitt er valið.
              Seljandi veitir upplýsingar um vörur eftir bestu vitund hverju sinni.
            </p>
          </div>

          <div className="terms__block">
            <h3 className="terms__block-title">Skilafrestur</h3>
            <p>
              Kaupandi hefur <strong>14 daga</strong> frá afhendingu til að skila vöru.
              Hægt er að fá nýja vöru, inneign eða fulla endurgreiðslu að sömu upphæð og
              varan kostaði, án sendingarkostnaðar. Sendingarkostnaður er ekki endurgreiddur.
            </p>
            <p>
              Hægt er að skila vöru með því að senda hana til okkar á kostnað viðskiptavinar,
              eða semja við okkur um afhendingu á{' '}
              <a href="mailto:maliasportehf@gmail.com">Maliasportehf@gmail.com</a> — við reynum
              eftir bestu getu að verða við þeirri ósk.
            </p>
            <p>
              <strong>Útsöluvörur:</strong> Hægt er að skipta í aðra stærð eða aðra útsöluvöru
              ef hún er til á lager. Ef rétt stærð er ekki til er veitt inneign.
            </p>
          </div>

          <div className="terms__block">
            <h3 className="terms__block-title">Skilyrði fyrir skilum</h3>
            <ul className="terms__list">
              <li>Varan sé í upprunalegu ástandi.</li>
              <li>Varan sé ónotuð.</li>
              <li>Varan sé í upprunalegum umbúðum og þær séu heilar.</li>
              <li>Kvittun eða staðfesting á kaupum þarf að fylgja.</li>
            </ul>
            <p>
              Malía sport ehf. metur söluhæfi skilavöru og áskilur sér rétt til að hafna
              vöruskilum ef ofangreindum skilyrðum er ekki fullnægt.
            </p>
          </div>

          <div className="terms__block">
            <h3 className="terms__block-title">Afhending:</h3>
            <p>
              Pantanir eru afgreiddar innan <strong>1–5 daga</strong> frá pöntun.
              Frí heimsending á Akranesi. Sendingar um allt land í gegnum Dropp.
            </p>
          </div>

          <div className="terms__block">
            <h3 className="terms__block-title">Trúnaður &amp; persónuvernd</h3>
            <p>
              Seljandi heitir viðskiptavinum fullum trúnaði um allar þær persónuupplýsingar
              sem þeir gefa upp í viðskiptum við Malía sport ehf.
            </p>
            <p>
              Ef eitthvað er óljóst má alltaf hafa samband á{' '}
              <a href="mailto:maliasportehf@gmail.com">Maliasportehf@gmail.com</a> og við
              svörum eins fljótt og unnt er.
            </p>
          </div>

          <div className="terms__block terms__block--meta">
            <p className="terms__meta">
              Malía sport ehf. &nbsp;·&nbsp; Kt. 600121-1110 &nbsp;·&nbsp; Janúar 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
