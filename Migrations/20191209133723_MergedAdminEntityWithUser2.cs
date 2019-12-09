using Microsoft.EntityFrameworkCore.Migrations;

namespace Matchmaker.Migrations
{
    public partial class MergedAdminEntityWithUser2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "Activities",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Activities_AdminId",
                table: "Activities",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Users_AdminId",
                table: "Activities",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Users_AdminId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_AdminId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Activities");
        }
    }
}
