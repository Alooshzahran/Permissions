using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _06072023_1643 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModulePermisssion");

            migrationBuilder.CreateTable(
                name: "UserModulePermission",
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
                    table.PrimaryKey("PK_UserModulePermission", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Module_UserModulePermission",
                        column: x => x.ModuleID,
                        principalTable: "Module",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Role_UserModulePermission",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_User_UserModulePermission",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 43, 25, 626, DateTimeKind.Local).AddTicks(958));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 43, 25, 626, DateTimeKind.Local).AddTicks(969));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 43, 25, 626, DateTimeKind.Local).AddTicks(970));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 16, 43, 25, 626, DateTimeKind.Local).AddTicks(972));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 6, 13, 43, 25, 626, DateTimeKind.Utc).AddTicks(876));

            migrationBuilder.CreateIndex(
                name: "IX_UserModulePermission_ModuleID",
                table: "UserModulePermission",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserModulePermission_RoleID",
                table: "UserModulePermission",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserModulePermission_UserID",
                table: "UserModulePermission",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModulePermission");

            migrationBuilder.CreateTable(
                name: "UserModulePermisssion",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ControllerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true)
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
    }
}
