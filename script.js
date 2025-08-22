// Chart.jsのグラフ描画
const ctx = document.getElementById('stackedBarChart').getContext('2d');
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
        // 高解像度パターン: 32x32で作成し、縮小して利用
        const chart = ctx.chart;
        const {ctx: canvasCtx} = chart;
        const w = 32, h = 32;
        // 元パターン作成
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = w;
        patternCanvas.height = h;
        const pctx = patternCanvas.getContext('2d');
        pctx.fillStyle = 'dodgerblue';
        pctx.fillRect(0, 0, w, h);
        pctx.strokeStyle = 'white';
        pctx.lineWidth = 2;
        pctx.beginPath();
        pctx.moveTo(0, h);
        pctx.lineTo(w, 0);
        pctx.stroke();
        // 縮小用パターン
        const smallCanvas = document.createElement('canvas');
        smallCanvas.width = 4;
        smallCanvas.height = 4;
        const sctx = smallCanvas.getContext('2d');
        sctx.drawImage(patternCanvas, 0, 0, w, h, 0, 0, smallCanvas.width, smallCanvas.height);
        window._stripePatternCanvas = smallCanvas;
        return canvasCtx.createPattern(smallCanvas, 'repeat');
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
new Chart(ctx, config);

// 折れ線積み上げグラフ用データ
const lineData = {
  labels: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
  datasets: [
    {
      label: '値1（折れ線）',
      data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      borderColor: 'white', // 線の色を白
      borderWidth: 1,
      backgroundColor: 'seagreen', // 棒グラフと同じ色
      fill: true,
      pointRadius: 0 // ポイント無し
    },
    {
      label: '値2（折れ線）',
      data: [60, 60, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      borderColor: 'white', // 線の色を白
      backgroundColor: function(ctx) {
        // 棒グラフと同じパターン塗りつぶし
        const chart = ctx.chart;
        const {ctx: canvasCtx} = chart;
        const w = 32, h = 32;
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = w;
        patternCanvas.height = h;
        const pctx = patternCanvas.getContext('2d');
        pctx.fillStyle = 'dodgerblue';
        pctx.fillRect(0, 0, w, h);
        pctx.strokeStyle = 'white';
        pctx.lineWidth = 2;
        pctx.beginPath();
        pctx.moveTo(0, h);
        pctx.lineTo(w, 0);
        pctx.stroke();
        const smallCanvas = document.createElement('canvas');
        smallCanvas.width = 8;
        smallCanvas.height = 8;
        const sctx = smallCanvas.getContext('2d');
        sctx.drawImage(patternCanvas, 0, 0, 32, 32, 0, 0, 8, 8);
        return canvasCtx.createPattern(smallCanvas, 'repeat');
      },
      fill: true,
      pointRadius: 0 // ポイント無し
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
        text: '２つの値の積み上げ折れ線グラフ'
      }
    },
    responsive: true
  }
};
// 新しいcanvasを追加
const lineCanvas = document.createElement('canvas');
lineCanvas.id = 'stackedLineChart';
document.getElementById('chart-container').appendChild(lineCanvas);
new Chart(lineCanvas.getContext('2d'), lineConfig);
