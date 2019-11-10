using Microsoft.EntityFrameworkCore.Migrations;

namespace Matchmaker.Migrations
{
    public partial class AddedRelationshipBetweenUsersAndActivitites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Activities_ActivityId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ActivityId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "UserActivity",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    ActivityId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivity", x => new { x.UserId, x.ActivityId });
                    table.ForeignKey(
                        name: "FK_UserActivity_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "ActivityId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserActivity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserActivity_ActivityId",
                table: "UserActivity",
                column: "ActivityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserActivity");

            migrationBuilder.AddColumn<string>(
                name: "ActivityId",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ActivityId",
                table: "Users",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Activities_ActivityId",
                table: "Users",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "ActivityId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
