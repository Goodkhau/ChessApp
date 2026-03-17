import _ from "lodash";
import { useState } from "react";

import "./ExpandableList.css";

export interface PredictionListItem {
  id?: string;
  move: string;
  weight: number;
  color?: string;
}

interface ExpandableListProps {
  icon?: string;
  predictionList: PredictionListItem[];
}

// const DEFAULT_ITEMS: PredictionListItem[] = [
//   { id: "1", move: "Authentication Service", weight: 0.899, color: "#5a5aff" },
//   { id: "2", move: "Database Layer", weight: 0.749, color: "#3effa0" },
//   { id: "3", move: "API Gateway", weight: 0.199, color: "#ff9f5a" },
//   { id: "4", move: "Cache Manager", weight: 1.000, color: "#ff5a8a" },
//   { id: "5", move: "Event Bus", weight: 0.698, color: "#c05aff" },
// ];

export default function ExpandableList({
  icon = ">>",
  predictionList,
}: ExpandableListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable-demo">
      <div className={`expandable ${isOpen ? "is-open" : ""}`}>
        <button
          className="expandable__toggle"
          onClick={() => setIsOpen((openState) => !openState)}
          aria-expanded={isOpen}
          aria-move={isOpen ? "Collapse" : "Expand"}
        >
          <span className={`expandable__toggle-icon ${isOpen ? "is-open" : ""}`}>
            {icon}
          </span>
        </button>
        <div className="expandable__content">
          <div className="expandable__list">
            {
              _.map(predictionList, ({
                id = "unknown",
                move = "unknown",
                weight = Number.NEGATIVE_INFINITY,
                color = "#FFFFFF",
              }: PredictionListItem, index: number) => (
                <div
                  key={id}
                  className="expandable__item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="expandable__item-dot"
                    style={{ background: color }}
                  />
                  <div className="expandable__item-content">
                    <div className="expandable__item-move">{move}</div>
                    <div className="expandable__item-progress-bar-container">
                      <div
                        className="expandable__item-progress-bar"
                        style={{ width: (weight*100)+"%" }}
                      />
                    </div>
                  </div>
                  <div className="expandable__item-weight">{weight.toFixed(3)}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
