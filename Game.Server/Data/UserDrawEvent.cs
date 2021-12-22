namespace Game.Server.Data
{
    public class UserDrawEvent
    {
        public int userId { get; set; } = -1;
        public bool isHandVisible { get; set; }
        public bool brushSize { get; set; }
        public string lineColor { get; set; }
        public Vector2 indexLoc { get; set; }
        public Vector2 lastPoint { get; set; }
        public Vector2 currentPoint { get; set; }
    }
}
