import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/numberFormat";
import { Check, Copy } from "lucide-react";
import type { PixData } from "../../types";

export type PixPaymentProps = {
  pixData: PixData;
};

export const PixPayment = ({ pixData }: PixPaymentProps) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      console.log("Tempo para novo envio permitido!");
    }
  }, [timeLeft]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <div className="mx-auto px-2 text-center">
      <h3 className="text-typography-light font-medium text-md mb-2">
        Valor da transição
      </h3>
      <p className="text-typography-dark font-semibold text-3xl mb-4">
        {formatCurrency(pixData?.amount)}
      </p>
      <img
        src={pixData?.qrCode}
        alt="QR Code"
        className="mx-auto rounded-lg mb-4"
      />
      <div
        className="flex items-center justify-content p-2 bg-common-light rounded-lg cursor-pointer border border-interface-border mb-4"
        onClick={handleCopy}
      >
        <p className="w-[90%] truncate text-typography-base text-sm">
          {pixData?.copyPaste}
        </p>
        {copied ? (
          <Check className="text-typography-dark" />
        ) : (
          <Copy className="text-typography-dark" />
        )}
      </div>

      <p className="text-typography-light text-xs mb-8">
        Essa transação expira em {timeLeft} segundos
      </p>

      {copied && (
        <div role="alert" className="p-2 bg-interface-success rounded-lg">
          <p className="text-common-light text-xs">
            Código Pix copiado para a área de transferência!
          </p>
        </div>
      )}
    </div>
  );
};
