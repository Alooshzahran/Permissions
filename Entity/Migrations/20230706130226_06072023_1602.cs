using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _06072023_1602 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserModulePermisssion",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    ControllerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModulePermisssion", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Module_UserModulePermisssion",
                        column: x => x.ModuleID,
                        principalTable: "Module",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Role_UserModulePermisssion",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_User_UserModulePermisssion",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 2, 25, 982, DateTimeKind.Local).AddTicks(8016));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 2, 25, 982, DateTimeKind.Local).AddTicks(8027));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 2, 25, 982, DateTimeKind.Local).AddTicks(8029));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 2, 25, 982, DateTimeKind.Local).AddTicks(8030));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 13, 2, 25, 982, DateTimeKind.Utc).AddTicks(7931));

            migrationBuilder.CreateIndex(
                name: "IX_UserModulePermisssion_ModuleID",
                table: "UserModulePermisssion",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserModulePermisssion_RoleID",
                table: "UserModulePermisssion",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserModulePermisssion_UserID",
                table: "UserModulePermisssion",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModulePermisssion");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 12, 12, 33, 903, DateTimeKind.Local).AddTicks(5681));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 12, 12, 33, 903, DateTimeKind.Local).AddTicks(5691));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 12, 12, 33, 903, DateTimeKind.Local).AddTicks(5693));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 12, 12, 33, 903, DateTimeKind.Local).AddTicks(5694));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 9, 12, 33, 903, DateTimeKind.Utc).AddTicks(5571));
        }
    }
}
