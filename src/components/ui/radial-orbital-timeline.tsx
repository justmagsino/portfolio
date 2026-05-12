"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (autoRotate && viewMode === "orbital") {
        setRotationAngle((prev) => (prev + 0.02 * deltaTime) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (autoRotate && viewMode === "orbital") {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoRotate, viewMode]);

  const [orbitRadius, setOrbitRadius] = useState(200);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 380) {
        setOrbitRadius(100);
      } else if (width < 480) {
        setOrbitRadius(115);
      } else if (width < 640) {
        setOrbitRadius(135);
      } else if (width < 768) {
        setOrbitRadius(170);
      } else {
        setOrbitRadius(200);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = orbitRadius * Math.cos(radian) + centerOffset.x;
    const y = orbitRadius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-primary-foreground bg-primary border-primary";
      case "in-progress":
        return "text-foreground bg-background border-border";
      case "pending":
        return "text-muted-foreground bg-muted/40 border-border/50";
      default:
        return "text-muted-foreground bg-muted/40 border-border/50";
    }
  };

  return (
    <div
      className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center bg-transparent"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Core */}
          <div className={`absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/40 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all duration-500 ${hoveredId ? "scale-110 shadow-[0_0_50px_rgba(var(--primary),0.6)]" : "animate-pulse"}`}>
            <div className={`absolute w-20 h-20 rounded-full border border-primary/30 animate-ping opacity-60 ${hoveredId ? "border-primary/50" : ""}`}></div>
            <div
              className={`absolute w-24 h-24 rounded-full border border-primary/20 animate-ping opacity-40 ${hoveredId ? "border-primary/40" : ""}`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-background backdrop-blur-md shadow-inner border border-primary/20"></div>
          </div>

          {/* Orbit Path - Enhanced visibility for light mode */}
          <div 
            className="absolute rounded-full border-2 border-primary/15 dark:border-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.05)]"
            style={{ 
              width: `${orbitRadius * 2}px`, 
              height: `${orbitRadius * 2}px` 
            }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isHovered = hoveredId === item.id;
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : isHovered ? 150 : position.zIndex,
              opacity: isExpanded || isHovered ? 1 : position.opacity,
              willChange: "transform",
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className={`absolute cursor-pointer ${autoRotate ? "transition-opacity duration-700" : "transition-all duration-700"}`}
                style={{
                  ...nodeStyle,
                  transitionProperty: autoRotate ? "opacity" : "all",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  setAutoRotate(false);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  if (!activeNodeId) setAutoRotate(true);
                }}
              >
                {/* Glow behind node */}
                <div
                  className={`absolute rounded-full -inset-4 blur-xl transition-all duration-500 ${
                    isExpanded || isHovered || isRelated ? "opacity-40" : "opacity-0"
                  }`}
                  style={{
                    background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                    transform: isHovered ? "scale(1.5)" : "scale(1)",
                  }}
                ></div>

                <div
                  className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded || isHovered
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                      : isRelated
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background dark:bg-card text-foreground border-border shadow-sm"
                  }
                  border transition-all duration-300 transform
                  ${isExpanded ? "scale-125 md:scale-150" : isHovered ? "scale-110 md:scale-125 border-primary" : "hover:scale-110 hover:border-primary"}
                `}
                >
                  <Icon size={16} className={`${isHovered ? "animate-pulse" : ""} md:w-[18px] md:h-[18px]`} />
                </div>

                <div
                  className={`
                  absolute top-10 md:top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] md:text-xs font-bold tracking-tight
                  transition-all duration-300
                  ${isExpanded || isHovered ? "text-primary scale-110" : "text-foreground/90 dark:text-foreground"}
                `}
                  style={{
                    textShadow: isHovered ? "0 0 10px rgba(var(--primary), 0.5)" : "0 1px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  {item.title}
                </div>
              </div>
            );
          })}

          {/* Expanded Card - Rendered outside the loop for better positioning */}
          {activeNodeId && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[300]">
              {timelineData.filter(item => item.id === activeNodeId).map(item => {
                const position = calculateNodePosition(
                  timelineData.findIndex(i => i.id === item.id),
                  timelineData.length
                );
                
                // On desktop, position near the node. On mobile, center it.
                const cardStyle = isMobile 
                  ? { transform: 'translateY(140px)' } 
                  : { transform: `translate(${position.x}px, ${position.y + 100}px)` };

                return (
                  <Card 
                    key={`card-${item.id}`}
                    className="pointer-events-auto w-[280px] md:w-64 bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl overflow-visible transition-all duration-500 ease-out"
                    style={cardStyle}
                  >
                    {!isMobile && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/60"></div>}
                    <CardHeader className="pb-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-0 h-5 text-[10px] uppercase font-bold ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "Mastered"
                            : item.status === "in-progress"
                            ? "Learning"
                            : "Planned"}
                        </Badge>
                        <span className="text-[10px] font-mono text-muted-foreground font-bold">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 font-bold text-foreground">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[12px] text-muted-foreground p-4 pt-0">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-border/60">
                        <div className="flex justify-between items-center text-[11px] mb-1.5">
                          <span className="flex items-center text-foreground/80 font-semibold">
                            <Zap size={11} className="mr-1 text-primary fill-primary/20" />
                            Proficiency
                          </span>
                          <span className="font-mono text-primary font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border/60">
                          <div className="flex items-center mb-2">
                            <Link size={11} className="text-primary mr-1" />
                            <h4 className="text-[11px] uppercase tracking-wider font-bold text-foreground/80">
                              Ecosystem
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-7 px-2.5 py-0 text-[10px] font-bold rounded-md border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-1 opacity-60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
