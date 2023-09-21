import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FeedItem } from "./App";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Followers Chart",
    },
  },
};

interface FollowersChartProps {
  feed: FeedItem[];
}

export const FollowersChart = ({ feed }: FollowersChartProps) => {
  const sorted = feed.sort(
    (a, b) => Date.parse(a.event_date) - Date.parse(b.event_date)
  );
  const labels: string[] = [];
  const following: number[] = [];
  const followers: number[] = [];

  sorted.forEach((item: FeedItem) => {
    labels.push(format(Date.parse(item.event_date), "yyyy-MM-dd"));
    following.push(item.following);
    followers.push(item.followers);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "No. of People Following Me",
        data: followers,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
      {
        label: "No. People I'm Following",
        data: following,
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  };
  return <Line options={options} data={data} />;
};
