export default {
  async scheduled(
    event: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ) {
    switch (event.cron) {
      // You can set up to three schedules maximum.​
      case "*/1 * * * *":
        console.log("This will be executed every minute");
        break;
      case "*/15 * * * *":
        console.log("This will be executed every 15 minutes");
        break;
      case "*/30 * * * *":
        console.log("This will be executed every 30 minutes");
        break;
    }
  }
}
