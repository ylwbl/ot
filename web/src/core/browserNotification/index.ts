function notification(message: 'string') {
  if (window.Notification) {
    Notification.requestPermission(function (status) {
      if (status === 'granted') {
        var n = new Notification(message);
      } else {
        alert('Hi!');
      }
    });
  }
}
export { notification };
