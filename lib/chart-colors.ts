export const chartColors = {
  primary: {
    gradient: ["#3B82F6", "#60A5FA", "#93C5FD"],
    solid: "#3B82F6"
  },
  secondary: {
    gradient: ["#8B5CF6", "#A78BFA", "#C4B5FD"],
    solid: "#8B5CF6"
  },
  success: {
    gradient: ["#10B981", "#34D399", "#6EE7B7"],
    solid: "#10B981"
  },
  warning: {
    gradient: ["#F59E0B", "#FBBF24", "#FCD34D"],
    solid: "#F59E0B"
  },
  danger: {
    gradient: ["#EF4444", "#F87171", "#FCA5A5"],
    solid: "#EF4444"
  },
  info: {
    gradient: ["#06B6D4", "#22D3EE", "#67E8F9"],
    solid: "#06B6D4"
  }
}

export const pieChartColors = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#10B981", // green
  "#F59E0B", // yellow
  "#EF4444", // red
  "#06B6D4", // cyan
  "#EC4899", // pink
  "#F97316", // orange
]

export const getGradientDef = (id: string, colors: string[]) => ({
  id,
  x1: "0",
  y1: "0",
  x2: "0",
  y2: "1",
  stops: [
    { offset: "5%", color: colors[0], opacity: 0.9 },
    { offset: "95%", color: colors[colors.length - 1], opacity: 0.3 },
  ]
})

