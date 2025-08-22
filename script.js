// Chart.jsのグラフ描画
const ctx = document.getElementById('stackedBarChart').getContext('2d');
const data = {
  labels: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
  datasets: [
    {
      label: '値1',
      data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      backgroundColor: 'seagreen'
    },
    {
      label: '値2',
      data: [60, 60, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      backgroundColor: function(ctx) {
        // 高解像度パターン: 32x32で作成し、16x16に縮小して利用
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
        smallCanvas.width = 8;
        smallCanvas.height = 8;
        const sctx = smallCanvas.getContext('2d');
        sctx.drawImage(patternCanvas, 0, 0, 32, 32, 0, 0, 8, 8);
        window._stripePatternCanvas = smallCanvas;
        return canvasCtx.createPattern(smallCanvas, 'repeat');
      }
    }
  ]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: '２つの値の積み上げ棒グラフ'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  }
};
new Chart(ctx, config);
