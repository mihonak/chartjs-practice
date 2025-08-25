// ストライプパターン生成関数
function createStripePattern(ctx, color = 'dodgerblue', stripeColor = 'white') {
  const w = 32, h = 32, sw = 4, sh = 4;
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = w;
  patternCanvas.height = h;
  const pctx = patternCanvas.getContext('2d');
  pctx.fillStyle = color;
  pctx.fillRect(0, 0, w, h);
  pctx.strokeStyle = stripeColor;
  pctx.lineWidth = 2;
  pctx.beginPath();
  pctx.moveTo(0, h);
  pctx.lineTo(w, 0);
  pctx.stroke();
  const smallCanvas = document.createElement('canvas');
  smallCanvas.width = sw;
  smallCanvas.height = sh;
  const sctx = smallCanvas.getContext('2d');
  sctx.drawImage(patternCanvas, 0, 0, w, h, 0, 0, sw, sh);
  return ctx.createPattern(smallCanvas, 'repeat');
}

// 棒グラフ
const data = {
  labels: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
  datasets: [
    {
      label: '値1',
      data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      backgroundColor: 'seagreen',
      borderColor: 'white',
      borderWidth: 1
    },
    {
      label: '値2',
      data: [60, 60, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      backgroundColor: function(ctx) {
        const chart = ctx.chart;
        const {ctx: canvasCtx} = chart;
        return createStripePattern(canvasCtx, 'dodgerblue', 'white');
      },
      borderColor: 'white',
      borderWidth: 1
    }
  ]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      xAxes: [{
        stacked: true,
        barThickness: 8,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 50
        }
      }]
    },
    plugins: {
      title: {
        display: true,
        text: '２つの値の積み上げ棒グラフ'
      }
    },
    responsive: true
  }
};
const barCtx = document.getElementById('stackedBarChart').getContext('2d');
new Chart(barCtx, config);

// 折れ線グラフ
const lineData = {
  labels: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
  datasets: [
    {
      label: '値1',
      data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      borderColor: 'white',
      borderWidth: 1,
      backgroundColor: 'orange',
      fill: true,
      pointRadius: 0
    },
    {
      label: '値2',
      data: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      borderColor: 'white',
      backgroundColor: function(ctx) {
        const chart = ctx.chart;
        const {ctx: canvasCtx} = chart;
        return createStripePattern(canvasCtx, 'dodgerblue', 'white');
      },
      fill: true,
      pointRadius: 0
    }
  ]
};
const lineConfig = {
  type: 'line',
  data: lineData,
  options: {
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: 'seagreen',
          callback: function(value, index, values) {
            // 最小値と最大値のみ表示
            if (index === 0 || index === values.length - 1) {
              return value + '歳';
            }
            return '';
          },
          maxRotation: 0,
          minRotation: 0
        }
      }],
      yAxes: [{
        stacked: true,
        beginAtZero: true,
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }]
    },
    plugins: {
      title: {
        display: true,
        text: '２つの値の積み上げ折れ線グラフ'
      }
    },
    responsive: true
  }
};
const lineCtx = document.getElementById('stackedLineChart').getContext('2d');
new Chart(lineCtx, lineConfig);

// 両端に三角形を描画（afterDrawのみでOKなので、addEventListener部分は削除）
Chart.plugins.register({
  afterDraw: function(chart) {
    if (chart.config.type !== 'line') return;
    const ctx = chart.chart.ctx;
    const area = chart.chartArea;
    if (!area) return;
    ctx.save();
    ctx.fillStyle = 'seagreen'; // 三角形の色
    // 左端三角
    ctx.beginPath();
    ctx.moveTo(area.left, area.bottom);
    ctx.lineTo(area.left + 10, area.bottom - 6);
    ctx.lineTo(area.left + 10, area.bottom + 6);
    ctx.closePath();
    ctx.fill();
    // 右端三角
    ctx.beginPath();
    ctx.moveTo(area.right, area.bottom);
    ctx.lineTo(area.right - 10, area.bottom - 6);
    ctx.lineTo(area.right - 10, area.bottom + 6);
    ctx.closePath();
    ctx.fill();
    // 三角形を結ぶ直線
    ctx.strokeStyle = 'seagreen';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(area.left + 10, area.bottom);
    ctx.lineTo(area.right - 10, area.bottom);
    ctx.stroke();
    // 下中央に「年齢」
    ctx.font = '12px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('年齢', (area.left + area.right) / 2, area.bottom + 12);
    ctx.restore();
  }
});
