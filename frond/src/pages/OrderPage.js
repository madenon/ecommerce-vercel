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

      <div className="p-4 w-full ">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index} className="mt-2 gap-3">
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded">
                <div className="flex lg:flex-row justify-between ">
                <div className="grid gap-1">
                  {item?.productDetails.map((product, index) => {
                    return (
                      <div
                        key={product.productId + index}
                        className="flex gap-3"
                      >
                        <img
                          src={product?.image[0]}
                          alt=""
                          className="w-24 h-24 bg-slate-300 object-scale-down p-2 shadow-md rounded-full"
                        />

                        <div>
                          <div className="font-medium text-lg text-ellipsis line-clamp-1">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-lg text-purple-400">
                              {displayCurrency(product.price)}
                            </div>
                            <p className="">Quantité :{product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col lg:flex-row justify-between">
                  <div>
                    <div className="text-lg font-medium">
                      Détails de Payement:{" "}
                    </div>
                    <p className="ml-1">
                      Methode de payement :
                      {item?.paymentDetails.payment_method_type[0]}
                    </p>
                    <p className="ml-1">
                      Statut de payment : {item?.paymentDetails.payment_status}
                    </p>
                  </div>
                </div>
                  </div>

                <div className="font-semibold ml-auto w-fit lg:text-lg">
                  Total de vos achats :{displayCurrency(item.totalAmount)}
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
