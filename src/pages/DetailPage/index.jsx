import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../redux/actions";
import { IoArrowBackOutline } from "react-icons/io5";
import InfoCard from "../../components/InfoCard";
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";
import HeaderLoader from "../../components/Loader/HeaderLoader";

const DetailPage = () => {
  //url deki parametreye eriş(arama parametresine erişmek isteseydik useSearchParams)
  const { country } = useParams();

  // verilere abone ol
  const { data, error, isLoading } = useSelector((store) => store);

  // dispatch kurulumu
  const dispatch = useDispatch();


  // verileri alacak fonk. (dispatch(getData(country)) bunu useEffect dışına çıkardık. Neden? çünkü ErrorDisplay bileşenine prop olarak yollayacağız. useEffect içindeyken prop olarak yollamayız şimdi fetchData isimli fonskiyonu yollayabiliriz.)
  const fetchData = () => {
    dispatch(getData(country));
  }
  // bileşen ekrana basılınca aksiyonu çağır
  useEffect(() => {
    fetchData()
  }, [country]); // bağımlılık dizisine country'i vererek farklı bir ülke aratıldığında search'te, tekrardan istek sonucu aratılan ülkenin gelmesini istiyoruz


  // covid bilgilerini bir DİZİYE çevir
  // ( || {} yoksa boş nesne gelsin hata vermesin. api'den covid gelene kadar bir süreliğine boş nesneyi kullansın onu diziye çevirmeye çalışsın )
  const covidData = Object.entries(data?.covid || {});


  return (
    // içerik aşağıya taşıyordu. sabit yüksekliği min-h şeklinde değiştirdik
    <div className="min-h-[calc(100vh-82px)] bg-gray-200 text-white p-6 grid place-items-center">
      <div className="min-h-[80vh] bg-white shadow-lg shadow-slate-500 rounded-sm p-8 max-w-3xl">
        {/* ÜST İÇERİK */}
        <div className="flex justify-between items-center gap-5 mb-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 py-2 px-4 rounded-sm"
          >
            <IoArrowBackOutline />
            Back
          </Link>

          <div className="flex items-center space-x-2">
            {/* isLoading devam ediyorsa loader bas, error yoksa ülkenin fotosunu bas */}
            {isLoading ? (
              <HeaderLoader />
            ) : (
              !error && (
                <>
                  <img
                    className="w-[74px] h-14"
                    src={data.country.flags.svg}
                    alt={data.country.name.common}
                  />
                  <h1 data-testid="title" className="text-3x font-bold text-slate-900">
                    {data.country.name.common}
                  </h1>
                </>
              )
            )}
          </div>
        </div>

        {/* DETAYLAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* yüklenme varsa Loader, yüklenme bittiyse ve hata varsa ErrorDisplay, hata da yoksa
        map'lemek içn diziye çevirdiğimiz covidData dizisini mapleyip her bir eleman için Infocard bas */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorDisplay message={error} retry={fetchData} />
          ) : (
            covidData.map((item, index) => <InfoCard item={item} key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
