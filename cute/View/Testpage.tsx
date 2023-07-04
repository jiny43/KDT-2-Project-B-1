import React, { useEffect, useState } from "react";
import axios from "axios";
import MetroCoord from '../model/MetropolitanCoordinate.json';

interface Route {
  duration: number;
  distance: number;
}

const KakaoApiExample: React.FC = () => {
  const kakaoApiKey = "9d667c01eb07e9f64c1df5d6156dbbf2";
  const origin = "127.3853,36.3492";
  const destination = "127.4332,36.3521";

  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoApiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (response.status === 200) {
          const firstRoute = data.routes[0];
          const firstSection = firstRoute.sections[0];
          setRoute({
            duration: firstSection.duration,
            distance: firstSection.distance,
          });
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {route ? (
        <div>
          <p>Duration: {route.duration}</p>
          <p>Distance: {route.distance}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default KakaoApiExample;
