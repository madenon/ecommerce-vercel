import React, { useEffect, useState } from "react";
import SummaryApi from "../commun";
import moment from "moment";
import displayCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && <p className="">Vous ne disposez pas d'aucune commande</p>}

      <div>
        {data.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>
              <div>
                {item?.productDetails.map((product, index) => {
                  return (
                    <div key={product.productId + index}>
                      <img
                        src={product?.image[0]}
                        alt=""
                        className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                      />
                      <div className="">{product.name}</div>
                      <div className="flex items-center gap-5">
                        <div className="">{displayCurrency(product.price)}</div>
                        <div className="">Quantité :{product.quantity}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <div>
                  Détails de Payement:
            </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
