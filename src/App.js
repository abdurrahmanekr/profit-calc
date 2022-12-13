import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function App() {
  const [purchasePrice, setPurchasePrice] = useState(localStorage.getItem('purchasePrice') || 0);
  const [profit, setProfit] = useState(localStorage.getItem('profit') || 100);
  const [commission, setCommission] = useState(localStorage.getItem('commission') || 0.2);
  const [floor, setFloor] = useState(localStorage.getItem('floor') || true);
  const [cargo, setCargo] = useState(localStorage.getItem('cargo') || 17);
  const [maxDiscount, setMaxDiscount] = useState(localStorage.getItem('maxDiscount') || 0.3);

  return (
    <div style={{
      margin: '10px'
    }}>
      <div>
        <font color="red">{profitCalc(purchasePrice, profit, commission, floor, cargo, 0).toFixed(2)}</font>₺ En az satılması gereken fiyat <br/> 
        <font color="green">{profitCalc(purchasePrice, profit, commission, floor, cargo, maxDiscount).toFixed(2)}</font>₺ İndirimsiz fiyat</div> 
      <p></p>
      <div>Alış Fiyatı</div>
      <input type="text" defaultValue={purchasePrice} onChange={(e) => {
        setPurchasePrice(e.target.value)
        localStorage.setItem('purchasePrice', e.target.value)
      }} />
      <div>Kâr</div>
      <input type="text" defaultValue={profit} onChange={(e) => {
        setProfit(e.target.value)
        localStorage.setItem('profit', e.target.value)
      }} />
      <div>Komisyon</div>
      <input type="text" defaultValue={commission} onChange={(e) => {
        setCommission(e.target.value)
        localStorage.setItem('commission', e.target.value)
      }} />
      <div>Yuvarlama</div>
      <input type="checkbox" defaultChecked={floor} onChange={(e) => {
        setFloor(e.target.checked)
        localStorage.setItem('floor', e.target.checked)
      }} />
      <div>Kargo</div>
      <input type="text" defaultValue={cargo} onChange={(e) => {
        setCargo(e.target.value)
        localStorage.setItem('cargo', e.target.value)
      }} />
      <div>Max İndirim</div>
      <input type="text" defaultValue={maxDiscount} onChange={(e) => {
        setMaxDiscount(e.target.value)
        localStorage.setItem('maxDiscount', e.target.value)
      }} />

      <p></p>
      <div>
        <button onClick={() => {
          localStorage.clear(); window.location.reload();
        }}>Sıfırla</button>
      </div>
    </div>
  );
}

function profitCalc(alisFiyat, kar = 10, komisyon = 0.2, floor = true, kargo = 15, maxIndirim = 0.3) {
  let result = (-kargo - alisFiyat - kar) / (-1+komisyon);
  let toplamKdv = (kargo * 0.18) / (0.18+1) + (result * komisyon * 0.18) / (0.18+1) + (alisFiyat * 0.08) / (0.08+1);

  let odenecekKdv = (result * 0.08) / (0.08+1);
  toplamKdv = odenecekKdv - toplamKdv;

  // devlete verilecek para çıktı
  if (toplamKdv > 0) {
      result = (-kargo - alisFiyat - toplamKdv - kar) / (-1+komisyon);
  }

  // max indirime göre satışı değiştir
  result = 1 / (1 - maxIndirim) * result;

  if (!floor)
      return result

  if (result%10 === 0) {
      result = Math.floor(result)
  }
  else if (result%10 < 5) {
      result = Math.floor(result/10) * 10 + 4.99
  }
  else {
      result = Math.floor(result/10) * 10 + 9.99
  }

  return result
}

export default App;
