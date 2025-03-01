'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (principal * x * monthlyRate) / (x - 1);

    setMonthlyPayment(monthly);
    setTotalPayment(monthly * numberOfPayments);
    setTotalInterest(monthly * numberOfPayments - principal);
  };

  const handleHomePriceChange = (value) => {
    const price = parseFloat(value.replace(/,/g, '')) || 0;
    setHomePrice(price);
    setDownPayment(price * (downPaymentPercent / 100));
  };

  const handleDownPaymentChange = (value) => {
    const payment = parseFloat(value.replace(/,/g, '')) || 0;
    setDownPayment(payment);
    setDownPaymentPercent((payment / homePrice) * 100);
  };

  const handleDownPaymentPercentChange = (value) => {
    const percent = parseFloat(value) || 0;
    setDownPaymentPercent(percent);
    setDownPayment(homePrice * (percent / 100));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mortgage Calculator</h2>
        <p className="text-muted-foreground">Estimate your monthly mortgage payments</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter your loan information to calculate payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="home-price" className="text-sm font-medium flex items-center">
                Home Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="home-price"
                  type="text"
                  className="pl-9"
                  value={homePrice.toLocaleString()}
                  onChange={(e) => handleHomePriceChange(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="down-payment" className="text-sm font-medium flex items-center">
                Down Payment
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="down-payment"
                    type="text"
                    className="pl-9"
                    value={downPayment.toLocaleString()}
                    onChange={(e) => handleDownPaymentChange(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="down-payment-percent"
                    type="text"
                    className="pl-9"
                    value={downPaymentPercent.toFixed(1)}
                    onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full mt-2">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Your estimated mortgage payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-4">
              <div className="text-sm text-muted-foreground">Monthly Payment</div>
              <div className="text-3xl font-bold text-primary">
                ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
