import _ from "lodash";
import { useState } from "react";

import "./ExpandableList.css";

interface ListItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface ExpandableListProps {
  icon?: string;
  items?: ListItem[];
}

const DEFAULT_ITEMS: ListItem[] = [
  { id: "1", label: "Authentication Service", value: 0.899, color: "#5a5aff" },
  { id: "2", label: "Database Layer", value: 0.749, color: "#3effa0" },
  { id: "3", label: "API Gateway", value: 0.199, color: "#ff9f5a" },
  { id: "4", label: "Cache Manager", value: 1.000, color: "#ff5a8a" },
  { id: "5", label: "Event Bus", value: 0.698, color: "#c05aff" },
];

export default function ExpandableList({
  icon = ">>",
  items = DEFAULT_ITEMS,
}: ExpandableListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable-demo">
      <div className={`expandable ${isOpen ? "is-open" : ""}`}>
        <button
          className="expandable__toggle"
          onClick={() => setIsOpen((openState) => !openState)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <span className={`expandable__toggle-icon ${isOpen ? "is-open" : ""}`}>
            {icon}
          </span>
        </button>
        <div className="expandable__content">
          <div className="expandable__list">
            {
              _.map(items, ({
                id = "unknown",
                label = "unknown",
                value = Number.NEGATIVE_INFINITY,
                color = "#FFFFFF",
              }: ListItem, index: number) => (
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
                    <div className="expandable__item-label">{label}</div>
                    <div className="expandable__item-progress-bar-container">
                      <div
                        className="expandable__item-progress-bar"
                        style={{ width: (value*100)+"%" }}
                      />
                    </div>
                  </div>
                  <div className="expandable__item-value">{value.toFixed(3)}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
